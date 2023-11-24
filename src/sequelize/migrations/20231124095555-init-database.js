'use strict'
const { v4: uuidv4 } = require('uuid')

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

      await queryInterface.createTable('user', {
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
      await queryInterface.dropTable('user')
      await transaction.commit()
    } catch (error) {
      if (transaction) {
        await transaction.rollback()
      }
    }
  },
}
