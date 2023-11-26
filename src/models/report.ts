import sequelize from '@sequelize'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import PostModal from './post'
import UserModal from './user'
import { EReportReason, IReportsAttributes } from '@types'

class ReportModel
  extends Model<IReportsAttributes>
  implements IReportsAttributes
{
  public id!: string
  public userId!: string
  public postId!: string
  public reason!: EReportReason
  public details?: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

ReportModel.init(
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
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

ReportModel.belongsTo(UserModal, { as: 'user', foreignKey: 'userId' })
ReportModel.belongsTo(PostModal, { as: 'post', foreignKey: 'postId' })
PostModal.hasMany(ReportModel, {
  foreignKey: 'postId',
  as: 'reports',
  onDelete: 'CASCADE',
  hooks: true,
})
UserModal.hasMany(ReportModel, {
  foreignKey: 'userId',
  as: 'reports',
  onDelete: 'CASCADE',
  hooks: true,
})
export default ReportModel
