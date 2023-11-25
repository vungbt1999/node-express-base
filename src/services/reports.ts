import Report from '@models/report'
import { EReportReason } from '@types'

const list = async () => {
  return await Report.findAll()
}

const create = async (commentBody: {
  userId: string
  postId: string
  reason: EReportReason
  details?: string
}): Promise<Report> => {
  return Report.create({ ...commentBody })
}

export const ReportServices = {
  list,
  create,
}
