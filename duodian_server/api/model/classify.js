const db = require('../../config')
const utils = require('../../utils/utils')

// 获取分类数据
const selectClassify = (phone) => {
  return new Promise((resolve, reject) => {
    db.query('select * from category', [phone], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(utils.renderData(res))
      }
    })
  })
}
module.exports = {
  selectClassify 
}