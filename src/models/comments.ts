import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import User from './users'
import Post from './posts'
import { ICommentsAttributes } from '@types'
import sequelize from '@sequelize'

class Comments
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

Comments.init(
  {
    id: {
      type: DataTypes.UUIDV4,
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
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

// Comments.belongsTo(User, { as: 'user', foreignKey: 'userId' })
// Comments.belongsTo(Post, { as: 'post', foreignKey: 'postId' })

export default Comments
