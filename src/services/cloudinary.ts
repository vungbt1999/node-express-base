import { strGenerate } from '@utils/helper'
import { format } from 'date-fns'
import slug from 'slug'
import { stringify } from 'qs'
import cloudinary from '@configs/cloudinary'

const moveFile = (publicId: string, folder: string) => {
  const name = publicId.split('/').pop()
  return cloudinary.uploader.rename(publicId, `${folder}/${name}`, {
    invalidate: true,
    overwrite: true,
  })
}

const signUrlAccess = (publicId?: string) => {
  return cloudinary.utils.sign_request({
    public_id: publicId,
    sign_url: true,
    type: 'authenticated',
  })
}

const signUrlUpload = (name?: string) => {
  const fileName = `${format(new Date(), 'yyyyMMddHHmmss')}-${slug(
    name || strGenerate({ length: 10, lowerCase: true }),
  )}`
  return cloudinary.utils.sign_request({
    public_id: `temp/${fileName}`,
    timestamp: Math.round(new Date().getTime() / 1000),
  })
}

const uploadUrl = (name?: string) => {
  const params = signUrlUpload(name)
  const { cloud_name, cloudinary_domain } = cloudinary.config()
  return `${cloudinary_domain}/${cloud_name}/auto/upload?${stringify(params)}`
}

export const CloudinaryServices = {
  moveFile,
  signUrlAccess,
  signUrlUpload,
  uploadUrl,
}
