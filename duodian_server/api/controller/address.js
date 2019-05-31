const address = require('../model/address.js')

const addAddress = async (req, res, next) => {
  let msg = await address.address(req.body)
  if(msg.affectedRows == 1) {
    res.send({
      code: 1,
      msg: '添加成功'
    })
  }
  res.send(12)
}

const view = async (req, res, next) => {
  const { id } = req.userInfo
  const list = await address.view(id)
  res.send(list)
}

const change = async (req, res, next) => {
  let msg = await address.change(req.body)
  if(msg.affectedRows > 0) {
    res.send({
      code: 1,
      msg: '修改成功'
    })
  }
}


module.exports = {
  addAddress,
  view,
  change
}