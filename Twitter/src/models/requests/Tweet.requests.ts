import { ParamsDictionary, Query } from 'express-serve-static-core'
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

export interface GetTweetReqParams extends ParamsDictionary {
  tweet_id: string
}

export interface TweetQuery extends Query {
  page: string
  limit: string
  tweet_type: string
}
