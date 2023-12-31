import sequelize from '@sequelize'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModal from './user'
import PostModal from './post'
import { IFavoritesAttributes } from '@types'

class FavoriteModel
  extends Model<IFavoritesAttributes>
  implements IFavoritesAttributes
{
  public id!: string
  public userId!: string
  public postId!: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

FavoriteModel.init(
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
  },
  {
    sequelize,
    modelName: 'favorite',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

FavoriteModel.belongsTo(UserModal, { as: 'user', foreignKey: 'userId' })
FavoriteModel.belongsTo(PostModal, { as: 'post', foreignKey: 'postId' })
PostModal.hasMany(FavoriteModel, {
  foreignKey: 'postId',
  as: 'favorites',
  onDelete: 'CASCADE',
  hooks: true,
})
UserModal.hasMany(FavoriteModel, {
  foreignKey: 'userId',
  as: 'favorites',
  onDelete: 'CASCADE',
  hooks: true,
})

export default FavoriteModel
