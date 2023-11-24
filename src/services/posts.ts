import Post from '@models/posts'

const list = async () => {
  return await Post.findAll()
}

const create = async (postData: {
  title: string
  content: string
  userId: string
  career: string
  general: string
}): Promise<Post> => {
  return Post.create({ ...postData, id: '' })
}

export const PostServices = {
  list,
  create,
}
