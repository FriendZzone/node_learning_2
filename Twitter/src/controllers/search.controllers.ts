import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SearchQuery } from '~/models/requests/Search.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import searchService from '~/services/search.services'

export const searchController = async (
  req: Request<ParamsDictionary, any, any, SearchQuery>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { content, page, limit, media_type, people_follow } = req.query

  const result = await searchService.search({
    content,
    page: Number(page),
    limit: Number(limit),
    media_type,
    people_follow: Boolean(people_follow),
    user_id
  })

  return res.json({
    message: 'Search successfully',
    result
  })
}
