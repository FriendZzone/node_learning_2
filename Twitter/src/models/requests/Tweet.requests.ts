import { ParamsDictionary, Query } from 'express-serve-static-core'
import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '../Others'

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

export interface PaginationQuery extends Query {
  page: string
  limit: string
}

export interface TweetQuery extends PaginationQuery {
  tweet_type: string
}
