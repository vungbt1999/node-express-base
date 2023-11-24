import User from '@models/users'
import { EUserRole } from '@types'

const list = async () => {
  await User.findAll()
}

const create = async (postData: {
  username: string
  password: string
  avatarUrl?: string
  role: EUserRole
}): Promise<User> => {
  return User.create({ ...postData, id: '' })
}

export const UserServices = {
  list,
  create,
}
