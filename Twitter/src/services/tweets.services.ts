import { ObjectId, WithId } from 'mongodb'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import Tweet from '~/models/schemas/Tweet.schema'
import databaseService from './database.services'
import HashTag from '~/models/schemas/Hashtag.schema'

class TweetService {
  async checkAndCreateHashtags(hashtags: string[]) {
    const hashtagDocuments = await Promise.all(
      hashtags.map((item) =>
        databaseService.hashtags.findOneAndUpdate(
          { name: item },
          { $setOnInsert: new HashTag({ name: item }) },
          { upsert: true, returnDocument: 'after' }
        )
      )
    )
    return hashtagDocuments.map((hashtag) => (hashtag.value as WithId<HashTag>)._id)
  }

  async createTweet(user_id: string, body: TweetRequestBody) {
    const hashtags = await this.checkAndCreateHashtags(body.hashtags)

    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: body.audience,
        content: body.content,
        hashtags: hashtags,
        mentions: body.mentions,
        medias: body.medias,
        parent_id: body.parent_id,
        type: body.type,
        user_id: new ObjectId(user_id)
      })
    )

    const tweet = await databaseService.tweets.findOne({ _id: result.insertedId })
    return tweet
  }

  async getTweet(tweet_id: string) {
    const tweet = await databaseService.tweets.findOne({ _id: new ObjectId(tweet_id) })
    return tweet
  }

  async increaseView(tweet_id: string, user_id?: string) {
    const inc = user_id ? { user_views: 1 } : { guest_views: 1 }
    const result = await databaseService.tweets.findOneAndUpdate(
      { _id: new ObjectId(tweet_id) },
      { $inc: inc, $currentDate: { updated_at: true } },
      {
        returnDocument: 'after',
        projection: {
          guest_views: 1,
          user_views: 1
        }
      }
    )

    return result.value as WithId<Pick<Tweet, 'guest_views' | 'user_views'>>
  }
}

const tweetService = new TweetService()
export default tweetService
