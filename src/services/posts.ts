import CommentModel from '@models/comment'
import Post from '@models/post'
import User from '@models/user'

const list = async () => {
  return await Post.findAll({
    include: [
      {
        model: User,
        as: 'user',
        required: false,
      },
      {
        model: CommentModel,
        as: 'comments',
      },
    ],
  })
}

const create = async (postData: {
  title: string
  content: string
  userId: string
  career: string
  general: string
}): Promise<Post> => {
  return Post.create({ ...postData })
}

export const PostServices = {
  list,
  create,
}
