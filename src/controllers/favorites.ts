import { FavoriteServices } from '@services'
import express from 'express'

const getAllFavorite = async (req: express.Request, res: express.Response) => {
  try {
    const favorites = await FavoriteServices.list()
    return res.status(200).json({ data: favorites })
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

const createFavorite = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req
    const favorite = await FavoriteServices.create(body)
    return res.status(200).json({ data: favorite })
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const FavoriteControllers = {
  getAllFavorite,
  createFavorite,
}
