import { MediaType } from '~/constants/enums'
import User from './schemas/User.schema'

export interface Media {
  url: string
  type: MediaType // video, image
}

export interface LikeNotification {
  user_id: string
  tweet_id: string
}
