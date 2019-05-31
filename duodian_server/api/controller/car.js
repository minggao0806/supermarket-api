const db = require('../../config/index.js')
const myCar = require('../model/car.js')
const product = require('../model/product.js')

const getList = async(req, res, next) => {
  const { id } = req.userInfo
  console.log(id)
  const list = await myCar.car(id)
  // let pid = []
  // list.forEach((el) => {
  //   pid.push(el.product_id)
  // })
  // const arr = await product.selectProduct({id: pid})
  // console.log(arr)
  res.send(list)
}

const addList = async (req, res, next) => {
  const { id, volume } = req.body;
  const userId = req.userInfo.id
  const list = await myCar.cart(userId)
  console.log(list)
  let affect = ''
  console.log(id, volume)
  const flag = list.some((el) => el.product_id == id)
  console.log(flag)
  if (flag) {
    affect = await myCar.change({
      id,
      num: volume
    })
    console.log(affect)
  } else {
    affect = await myCar.add({
      id,
      num: volume
    })

    console.log(affect)
  }

  if (affect.affectedRows > 0) {
    res.send({
      code: 1,
      msg: '添加成功'
    })
  } else {
    res.send({
      code: 0,
      msg: '添加失败'
    })
  }
}

const deleteCar = async (req, res, next) => {
  let { id } = req.query
  let userId = req.userInfo.id
  const affect = await myCar.deleteCar(userId, id)
  console.log(affect)
  if (affect.affectedRows > 0) {
    res.send({
      code: 1,
      msg: '删除成功'
    })
  } else {
    res.send({
      code: 0,
      msg: '删除失败'
    })
  }
}

const changeActive = async (req, res, next) => {
  let { id, act} = req.query
  let userId = req.userInfo.id
  act = act == 0 ? '1' : '0'
  console.log(id, act)
  const affect = await myCar.changeAct(act, userId, id)
  if (affect.affectedRows > 0) {
    res.send({
      code: 1,
      msg: '修改成功'
    })
  } else {
    res.send({
      code: 0,
      msg: '修改失败'
    })
  }
}


const getPrice = async (req, res, next) => {
  let userId = req.userInfo.id
  const data = await myCar.car(userId)
  let count = 0
  data.forEach((el) => {
    if (el.active == 1) {
      count += el.price * el.num
    }
  })
  console.log(count)
  res.send({
    code: 1,
    totalPrice: count
  })
}

module.exports = {
  getList,
  addList,
  deleteCar,
  changeActive,
  getPrice
}