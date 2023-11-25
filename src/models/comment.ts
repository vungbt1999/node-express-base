import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import User from './user'
import Post from './post'
import { ICommentsAttributes } from '@types'
import sequelize from '@sequelize'

class CommentModel
  extends Model<ICommentsAttributes>
  implements ICommentsAttributes
{
  public id!: string
  public userId!: string
  public postId!: string
  public content!: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

CommentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'comment',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

CommentModel.belongsTo(User, { as: 'user', foreignKey: 'userId' })
CommentModel.belongsTo(Post, { as: 'post', foreignKey: 'postId' })
Post.hasMany(CommentModel, {
  foreignKey: 'postId',
  as: 'comments',
  onDelete: 'CASCADE',
  hooks: true,
})
User.hasMany(CommentModel, {
  foreignKey: 'userId',
  as: 'comments',
  onDelete: 'CASCADE',
  hooks: true,
})

export default CommentModel
