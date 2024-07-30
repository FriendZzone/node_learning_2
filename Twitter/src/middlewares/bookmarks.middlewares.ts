import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { BOOKMARK_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const bookmarkValidator = validate(
  checkSchema(
    {
      tweet_id: {
        custom: {
          options: (value, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(BOOKMARK_MESSAGES.TWEET_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
