import { IModelBase } from './common'

export enum EReportReason {
  Spam = 'spam',
  Inappropriate = 'inappropriate',
  Other = 'other',
}

export interface IReportsAttributes extends IModelBase {
  userId: string
  postId: string
  reason: EReportReason
  details?: string
}
