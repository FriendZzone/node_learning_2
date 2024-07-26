import { checkSchema } from 'express-validator'
import { TweetType } from '~/constants/enums'
import { numberEnumToArray } from '~/utils/common'
import { validate } from '~/utils/validation'

export const createTweetValidator = validate(
  checkSchema(
    {
      type: {
        isIn: {
          options: numberEnumToArray(TweetType)
        }
      }
    },
    ['body']
  )
)
