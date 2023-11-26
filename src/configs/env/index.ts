const language = process.env.LOCALE_DEFAULT ?? 'en'

const jwt = {
  secret: process.env.JWT_SECRET_KEY ?? 'BaseAPI',
  expires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 60 * 10,
  refreshExpires:
    Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 60 * 60 * 24 * 30,
}
export default {
  language,
  jwt,
  server: {
    env: process.env.NODE_ENV ?? 'development',
    host: process.env.HOST ?? 'http://localhost',
    port: process.env.PORT ?? 4000,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME ?? 'dqt2c5wxb',
    key: process.env.CLOUDINARY_API_KEY ?? '671853612969619',
    secret: process.env.CLOUDINARY_API_SECRET ?? 'Fcop5ct7H8qPon4f_hJEZ52WAt0',
    domain: process.env.CLOUDINARY_DOMAIN ?? 'https://api.cloudinary.com/v1_1/',
  },
}
