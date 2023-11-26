import sequelize from '@sequelize'

const existsRule = async (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void,
) => {
  const params = args.split(',')
  const [model, key, extra] = params
  let sql = `SELECT "${model}".id FROM "${model}" WHERE "${model}".${key} = '${value}'`
  if (extra) {
    sql += ` AND ${extra}`
  }
  sql += ' LIMIT 1;'

  const [result] = await sequelize.query(sql)
  if (result && result.length) {
    return passes()
  } else {
    return passes(false)
  }
}

export default existsRule
