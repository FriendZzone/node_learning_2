import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LIKE_MESSAGES } from '~/constants/messages'
import { NotificationType } from '~/constants/notification'
import { LikeNotification } from '~/models/Others'
import { LikeTweetReqBody, UnlikeTweetReqParams } from '~/models/requests/Like.request'
import { TokenPayload } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import likeService from '~/services/likes.services'
import notificationService from '~/services/notification.services'

export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await likeService.likeTweet(tweet_id, user_id)
  await notificationService.sendNotification<LikeNotification>(NotificationType.LIKE_TWEET, {
    user_id,
    tweet_id
  })

  return res.json({
    message: LIKE_MESSAGES.LIKE_SUCCESSFULLY,
    result
  })
}

export const unlikeTweetController = async (req: Request<UnlikeTweetReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.params
  await likeService.unlikeTweet(tweet_id, user_id)
  return res.json({
    message: LIKE_MESSAGES.UNLIKE_SUCCESSFULLY
  })
}
