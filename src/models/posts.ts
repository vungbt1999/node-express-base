import sequelize from '@sequelize'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import User from './users'
import Comments from './comments'
import Reports from './reports'
import Favorites from './favorites'
import { IPostAttributes } from '@types'

class Post extends Model<IPostAttributes> implements IPostAttributes {
  public id!: string
  public title!: string
  public content!: string
  public userId!: string
  public career!: string
  public general!: string
  public isAnonymously?: boolean
  public assetUrls?: string[]
  public embedUrl?: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

Post.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    career: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    general: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAnonymously: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    assetUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    embedUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'post',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

// Post.belongsTo(User, { as: 'user', foreignKey: 'userId' })
// Post.hasMany(Comments, { as: 'comments', foreignKey: 'postId' })
// Post.hasMany(Reports, { as: 'reports', foreignKey: 'postId' })
// Post.hasMany(Favorites, { as: 'favorites', foreignKey: 'postId' })

export default Post
