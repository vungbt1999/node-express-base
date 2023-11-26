import HttpStatus from 'http-status-codes'
import { PostServices } from '@services'
import { IPostFindAllReq } from '@types'
import { NextFunction, Request, Response } from 'express'

const getAllPost = async (
  req: Request<{}, {}, {}, IPostFindAllReq>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queries = req.query
    const pagination = req.pagination
    const posts = await PostServices.list(queries, pagination)
    return res.jsonApi(HttpStatus.OK, posts)
  } catch (error) {
    next(error)
  }
}

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const post = await PostServices.create(body)
    return res.jsonApi(HttpStatus.OK, { ...post })
  } catch (error) {
    next(error)
  }
}

export const PostControllers = {
  getAllPost,
  createPost,
}
