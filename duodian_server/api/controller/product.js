const Ban = require('../model/product.js')
const product = require('../model/product.js')
const food = require('../model/food.js')
const utils = require('../../utils/utils.js')
const classify = require('../model/classify.js')

const banner = async (req, res, next) => {
  const { dataType } = req.query
  const bannerList = await Ban.getBanner(dataType)
  res.send(bannerList)
}

const list = async (req, res, next) => {
  const {
    page = 1,
    pageSize = 10,
    categoryId,
    ...rest
  } = req.query
  let ids = ''
  if (categoryId) {
    const data = await classify.selectClassify()
    const newData = utils.arrayToTree(data)
    ids = utils.getChildrenId(newData, categoryId)
  }

  const productData = await product.selectProduct({
    page,
    pageSize,
    categoryId: ids
  })
   res.send({
     code: 1,
     data: productData
   })

}


module.exports = {
  banner,
  list
}