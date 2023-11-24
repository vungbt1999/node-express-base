import sequelize from '@sequelize'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import Post from './posts'
import Comments from './comments'
import Reports from './reports'
import Favorites from './favorites'
import { EUserRole, IUserAttributes } from '@types'

class User extends Model<IUserAttributes> implements IUserAttributes {
  public id!: string
  public username!: string
  public password!: string
  public role!: EUserRole
  public avatarUrl?: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(
        EUserRole.Admin,
        EUserRole.Employee,
        EUserRole.Employer,
      ),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

User.prototype.toJSON = function () {
  const values: any = Object.assign({}, this.get())
  delete values.password
  return values
}

// User.hasMany(Post, { as: 'posts', foreignKey: 'userId' })
// User.hasMany(Comments, { as: 'comments', foreignKey: 'userId' })
// User.hasMany(Reports, { as: 'reports', foreignKey: 'userId' })
// User.hasMany(Favorites, { as: 'favorites', foreignKey: 'userId' })

export default User
