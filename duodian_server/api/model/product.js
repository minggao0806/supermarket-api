const db = require('../../config/index.js')
const utils = require('../../utils/utils.js')

const getBanner = (dataType) => {
  return new Promise((resolve, reject) => {
    db.query('select * from banner where dataType=?', [dataType], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

const selectProduct = (options) => {
  const {
    page,
    pageSize,
    categoryId,
    id,
    ...rest
  } = options

  return new Promise((resolve, reject) => {
    let sql = `select * from product `
    if (categoryId) {
      sql += `where categoryId in (${categoryId.toString()})`
    }
    if (id) {
      sql += `where id in (${id.toString()})`      
    }

    if (Object.keys(rest).length >= 1) {
      for (let key in rest) {
        sql += `order by ${key} ${rest[key] == 0 ? 'asc' : 'desc'}`
      }
    }

    if ( page && pageSize) {
      sql += `limit ${pageSize * (page - 1)}, ${pageSize}`
    }
    
    db.query(sql, [], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(utils.renderData(res))
      }
    })
  })
}

module.exports = {
  getBanner,
  selectProduct
}