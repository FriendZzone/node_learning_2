import { Router } from 'express'
import { searchController } from '~/controllers/search.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

const searchRouter = Router()

searchRouter.get('/', accessTokenValidator, searchController)

export default searchRouter
