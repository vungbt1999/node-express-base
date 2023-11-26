import { CloudinaryServices } from './cloudinary'
import NotFound from '@utils/errors/NotFound'

const uploadUrl = async (name?: string) => {
  if (!name) throw new NotFound()
  return CloudinaryServices.uploadUrl(name)
}

export const FileServices = {
  uploadUrl,
}
