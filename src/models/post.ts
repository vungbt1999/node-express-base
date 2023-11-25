import sequelize from '@sequelize'
import { IPostAttributes } from '@types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import User from './user'

class PostModel extends Model<IPostAttributes> implements IPostAttributes {
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

PostModel.init(
  {
    id: {
      type: DataTypes.UUID,
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
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

PostModel.belongsTo(User, { as: 'user', foreignKey: 'userId' })
User.hasMany(PostModel, {
  foreignKey: 'userId',
  as: 'posts',
  onDelete: 'CASCADE',
  hooks: true,
})

export default PostModel
