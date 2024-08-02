import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
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
  const { tweet_id } = req.params
  const result = await tweetService.getTweet(tweet_id)

  return res.json({
    message: 'create tweet controller',
    data: result
  })
}
