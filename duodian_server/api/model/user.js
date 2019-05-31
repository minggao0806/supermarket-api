const db = require('../../config/index.js')
const utils = require('../../utils/utils.js')
const findUser = (phone) => {
  return new Promise((resolve, reject) => {
    db.query('select * from user where phone=?', [phone], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(utils.renderData(res)[0])
      }
    })
  })
}

module.exports = {
  findUser
}