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

      await queryInterface.createTable('post', {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: () => uuidv4(),
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        career: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        general: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isAnonymously: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        assetUrls: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
          defaultValue: [],
        },
        embedUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
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
      await queryInterface.dropTable('post')
      await transaction.commit()
    } catch (error) {
      if (transaction) {
        await transaction.rollback()
      }
    }
  },
}
