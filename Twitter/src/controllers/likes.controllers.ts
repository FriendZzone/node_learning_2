import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
import likeService from '~/services/likes.services'
import { LikeTweetReqBody, UnlikeTweetReqParams } from '~/models/requests/Like.request'
import { LIKE_MESSAGES } from '~/constants/messages'
import usersService from '~/services/users.services'
import { NotificationType } from '~/constants/notification'
import notificationService from '~/services/notification.services'

export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await likeService.likeTweet(tweet_id, user_id)
  await notificationService.sendNotification(NotificationType.LIKE_TWEET, { tweet_id, user_id })

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
