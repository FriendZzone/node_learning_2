import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
import { GetTweetReqParams, TweetRequestBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetService from '~/services/tweets.services'

export const createTweetController = async (
  req: Request<ParamsDictionary, any, TweetRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetService.createTweet(user_id, req.body)
  return res.json({
    message: 'create tweet controller',
    data: result
  })
}

export const getTweetController = async (req: Request<GetTweetReqParams>, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const {
    tweet,
    params: { tweet_id }
  } = req
  const result = await tweetService.increaseView(tweet_id, user_id)

  const tweetWithViews = {
    ...tweet,
    user_views: result.user_views,
    guest_views: result.guest_views,
    updated_at: result.updated_at
  }

  return res.json({
    message: 'create tweet controller',
    data: tweetWithViews
  })
}

export const getTweetChildrenController = async (
  req: Request<GetTweetReqParams>,
  res: Response,
  next: NextFunction
) => {
  const { tweet_id } = req.params
  const { user_id } = req.decoded_authorization as TokenPayload
  const tweet_type = Number(req.query.tweet_type as string) as TweetType
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)

  const { tweets, total } = await tweetService.getTweetChildren({
    tweet_id,
    tweet_type,
    page,
    limit,
    user_id
  })

  return res.json({
    message: 'Get Tweet Children Successfully',
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total_page: Math.ceil(total / limit)
    }
  })
}
