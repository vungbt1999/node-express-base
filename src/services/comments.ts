import Comment from '@models/comment'
import PostModel from '@models/post'
import UserModel from '@models/user'

const list = async () => {
  return await Comment.findAll({
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

const create = async (commentBody: {
  userId: string
  postId: string
  content: string
}): Promise<Comment> => {
  return Comment.create({ ...commentBody })
}

export const CommentServices = {
  list,
  create,
}
