import { Sequelize } from 'sequelize'
const sequelize = new Sequelize(
  'postgres://root:961126@localhost:5432/base_api',
) // Example for postgres
export default sequelize
