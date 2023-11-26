import Post from '@models/post'
import { IPaginationReq, IPostAttributes, IPostFindAllReq } from '@types'
import { resPagination } from '@utils/helper'
import { Op, WhereOptions } from 'sequelize'

const list = async (params: IPostFindAllReq, pagination: IPaginationReq) => {
  const { page, pageSize, limit, offset } = pagination
  const { q } = params
  const whereCondition: WhereOptions<IPostAttributes> = {
    title: { [Op.iLike]: `%${q}%` },
  }

  const { count, rows } = await Post.findAndCountAll({
    offset,
    limit,
    where: whereCondition,
  })
  const paginationRes = resPagination(count, pagination)
  return {
    data: rows,
    page,
    pageSize,
    ...paginationRes,
  }
}

const create = async (postData: {
  title: string
  content: string
  userId: string
  career: string
  general: string
}) => {
  const res = await Post.create({ ...postData })
  return {
    data: res,
  }
}

export const PostServices = {
  list,
  create,
}
