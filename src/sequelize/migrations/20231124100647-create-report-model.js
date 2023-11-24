'use strict'
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()

      await queryInterface.createTable('report', {
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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: null,
        },
      })
      await transaction.commit()
    } catch (error) {
      if (transaction) {
        await transaction.rollback()
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()
      await queryInterface.dropTable('report')
      await transaction.commit()
    } catch (error) {
      if (transaction) {
        await transaction.rollback()
      }
    }
  },
}
