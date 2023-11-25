import { ReportServices } from '@services'
import express from 'express'

const getAllReport = async (req: express.Request, res: express.Response) => {
  try {
    const reports = await ReportServices.list()
    return res.status(200).json({ data: reports })
  } catch (error) {
    return res.sendStatus(400)
  }
}

const createReport = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req
    const report = await ReportServices.create(body)
    return res.status(200).json({ data: report })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const ReportControllers = {
  getAllReport,
  createReport,
}
