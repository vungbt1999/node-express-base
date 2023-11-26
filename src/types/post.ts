import { IModelBase } from './common'

export interface IPostAttributes extends IModelBase {
  title: string
  content: string
  userId: string
  career: string
  general: string
  isAnonymously?: boolean
  assetUrls?: string[]
  embedUrl?: string
}

export interface IPostFindAllReq {
  q?: string
}
