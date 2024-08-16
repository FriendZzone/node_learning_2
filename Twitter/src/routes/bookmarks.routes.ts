import { Router } from 'express'
import {
  bookmarkedTweetsController,
  createBookmarkController,
  unBookmarkController
} from '~/controllers/bookmarks.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const bookmarksRouter = Router()

/**
 * Description. Create a bookmark
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(createBookmarkController)
)

/**
 * Description. Delete a bookmark
 * Path: /
 * Method: DELETE
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unBookmarkController)
)

/**
 * Description. Get list bookmarked tweets
 * Path: /bookmarked-tweets
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.get(
  '/bookmarked-tweets',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(bookmarkedTweetsController)
)

export default bookmarksRouter
