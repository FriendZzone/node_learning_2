import { ObjectId, WithId } from 'mongodb'
import Like from '~/models/schemas/Like.schema'
import databaseService from './database.services'

class LikeService {
  async likeTweet(tweet_id: string, user_id: string) {
    const result = await databaseService.likes.findOneAndUpdate(
      {
        tweet_id: new ObjectId(tweet_id),
        user_id: new ObjectId(user_id)
      },
      {
        $setOnInsert: new Like({
          tweet_id: new ObjectId(tweet_id),
          user_id: new ObjectId(user_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )

    return result.value as WithId<Like>
  }

  async unlikeTweet(tweet_id: string, user_id: string) {
    const result = await databaseService.likes.deleteOne({
      tweet_id: new ObjectId(tweet_id),
      user_id: new ObjectId(user_id)
    })
    return result
  }
}

const likeService = new LikeService()
export default likeService
