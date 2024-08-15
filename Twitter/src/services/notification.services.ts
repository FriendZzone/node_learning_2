import { NotificationType } from '~/constants/notification'
import Tweet from '~/models/schemas/Tweet.schema'
import User from '~/models/schemas/User.schema'
import { sendEmail } from '~/utils/email'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class NotificationService {
  async sendNotification(type: NotificationType, data: any) {
    if (type === NotificationType.LIKE_TWEET) {
      const { tweet_id, user_id } = data
      const tweetData = (await databaseService.tweets.findOne({ _id: new ObjectId(tweet_id) })) as Tweet
      const { user_id: tweetUserId } = tweetData
      const [likeUser, tweetUser] = await Promise.all([
        databaseService.users.findOne({ _id: new ObjectId(user_id) }),
        databaseService.users.findOne({ _id: new ObjectId(tweetUserId) })
      ])

      const { email } = tweetUser as User
      const { name } = likeUser as User
      const sendEmailRes = await sendEmail(email, 'Like Tweet', `Hi ${name}, Someone just liked your tweet`)

      return sendEmailRes
    }
    return true
  }
}

const notificationService = new NotificationService()
export default notificationService
