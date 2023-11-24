import sequelize from '@sequelize'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import Post from './posts'
import User from './users'
import { EReportReason, IReportsAttributes } from '@types'

class Reports extends Model<IReportsAttributes> implements IReportsAttributes {
  public id!: string
  public userId!: string
  public postId!: string
  public reason!: EReportReason
  public details?: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

Reports.init(
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
    reason: {
      type: DataTypes.ENUM(
        EReportReason.Spam,
        EReportReason.Inappropriate,
        EReportReason.Other,
      ),
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'report',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

// Reports.belongsTo(User, { as: 'user', foreignKey: 'userId' })
// Reports.belongsTo(Post, { as: 'post', foreignKey: 'postId' })

export default Reports
