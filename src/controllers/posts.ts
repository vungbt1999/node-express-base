import { PostServices } from '@services'
import express from 'express'

const getAllPost = async (req: express.Request, res: express.Response) => {
  try {
    const posts = await PostServices.list()
    return res.status(200).json({ data: posts })
  } catch (error) {
    return res.sendStatus(400)
  }
}

const createPost = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req
    const post = await PostServices.create(body)
    return res.status(200).json({ data: post })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const PostControllers = {
  getAllPost,
  createPost,
}
