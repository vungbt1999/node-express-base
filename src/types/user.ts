import { IModelBase } from './common'

export enum EUserRole {
  Admin = 'admin',
  Employee = 'employee',
  Employer = 'employer',
}

export interface IUserAttributes extends IModelBase {
  username: string
  password: string
  avatarUrl?: string
  role: EUserRole
}
