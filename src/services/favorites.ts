import FavoriteModel from '@models/favorite'
import PostModel from '@models/post'
import UserModel from '@models/user'

const list = async () => {
  return await FavoriteModel.findAll({
    include: [
      {
        model: UserModel,
        as: 'user',
      },
      {
        model: PostModel,
        as: 'post',
      },
    ],
  })
}

const create = async (favoriteBody: {
  userId: string
  postId: string
}): Promise<FavoriteModel> => {
  return FavoriteModel.create({ ...favoriteBody })
}

export const FavoriteServices = {
  list,
  create,
}
