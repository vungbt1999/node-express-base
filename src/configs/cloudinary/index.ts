import env from '@configs/env'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: env.cloudinary.name,
  api_key: env.cloudinary.key,
  api_secret: env.cloudinary.secret,
  cloudinary_domain: env.cloudinary.domain,
})

export default cloudinary.v2
