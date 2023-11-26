import { FileServices } from '@services'
import express, { NextFunction } from 'express'
import HttpStatus from 'http-status-codes'

const getSignUrlUpload = async (
  req: express.Request<{}, {}, {}, { name?: string }>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const queries = req.query
    const name = queries?.name ?? ''
    const urlUpload = await FileServices.uploadUrl(name)
    return res.jsonApi(HttpStatus.OK, { data: urlUpload })
  } catch (error) {
    next(error)
  }
}

export const FileControllers = {
  getSignUrlUpload,
}
