import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModal from './user'
import PostModal from './post'
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
  public parentId?: string
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
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
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

CommentModel.belongsTo(UserModal, { as: 'user', foreignKey: 'userId' })
CommentModel.belongsTo(PostModal, { as: 'post', foreignKey: 'postId' })
PostModal.hasMany(CommentModel, {
  foreignKey: 'postId',
  as: 'comments',
  onDelete: 'CASCADE',
  hooks: true,
})
UserModal.hasMany(CommentModel, {
  foreignKey: 'userId',
  as: 'comments',
  onDelete: 'CASCADE',
  hooks: true,
})
CommentModel.hasMany(CommentModel, { as: 'replies', foreignKey: 'parentId' })

export default CommentModel
