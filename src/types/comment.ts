import { IModelBase } from './common'

export interface ICommentsAttributes extends IModelBase {
  userId: string
  postId: string
  content: string
  parentId?: string
}
