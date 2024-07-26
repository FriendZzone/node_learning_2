import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '../Orther'

export interface TweetRequestBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string
  hashtags: string[]
  mentions: string[]
  medias: Media[]
}
