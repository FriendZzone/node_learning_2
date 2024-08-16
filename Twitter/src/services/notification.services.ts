import { ObjectId } from 'mongodb'
import { TWEETS_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import { NotificationType } from '~/constants/notification'
import { sendEmail } from '~/utils/email'
import { LikeNotification } from '../models/Others'
import databaseService from './database.services'

class NotificationService {
  async sendNotification<T>(type: NotificationType, data: T) {
    if (type === NotificationType.LIKE_TWEET) {
      const { tweet_id, user_id } = data as LikeNotification
      const likeUser = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
      if (!likeUser) return USERS_MESSAGES.USER_NOT_FOUND

      const tweetData = await databaseService.tweets
        .aggregate([
          {
            $match: { _id: new ObjectId(tweet_id) }
          },
          {
            $lookup: {
              from: 'users', // Name of your users collection
              localField: 'user_id', // Field in tweets collection referencing the user
              foreignField: '_id', // Field in users collection matching the user_id
              as: 'tweetUser'
            }
          },
          {
            $unwind: '$tweetUser' // Unwind the array of joined users
          },
          {
            $project: {
              // Select the fields you need
              _id: 1,
              tweet_id: 1,
              tweetUser: {
                email: 1, // Get the email from the joined user
                name: 1
                // ... other fields you need from the user
              }
            }
          }
        ])
        .toArray()

      if (!tweetData.length) return TWEETS_MESSAGES.TWEET_NOT_FOUND

      const { email, name: tweetUserName } = tweetData[0].tweetUser
      const { name } = likeUser
      const sendEmailRes = await sendEmail(email, 'Like Tweet', `Hi ${tweetUserName}, ${name} just liked your tweet`)

      return sendEmailRes
    }
    return true
  }
}

const notificationService = new NotificationService()
export default notificationService
