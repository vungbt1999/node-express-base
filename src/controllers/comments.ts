import { CommentServices } from '@services'
import express from 'express'

const getAllComment = async (req: express.Request, res: express.Response) => {
  try {
    const comments = await CommentServices.list()
    return res.status(200).json({ data: comments })
  } catch (error) {
    return res.sendStatus(400)
  }
}

const createComment = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req
    const comment = await CommentServices.create(body)
    return res.status(200).json({ data: comment })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const CommentControllers = {
  getAllComment,
  createComment,
}
