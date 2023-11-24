import sequelize from '@sequelize'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import User from './users'
import Post from './posts'
import { IFavoritesAttributes } from '@types'

class Favorites
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

Favorites.init(
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
  },
  {
    sequelize,
    modelName: 'favorite',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

// Favorites.belongsTo(User, { as: 'user', foreignKey: 'userId' })
// Favorites.belongsTo(Post, { as: 'post', foreignKey: 'postId' })

export default Favorites
