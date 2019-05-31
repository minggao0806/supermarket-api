const db = require('../../config/index.js')
const utils = require('../../utils/utils.js')
const food = () => {
  return new Promise((resolve, reject) => {
    db.query('select * from category', [], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(utils.arrayToTree(utils.renderData(res)))
      }
    })
  })
}

module.exports = {
  food
}