const db = require('../../config/index.js')

//查询购物车和product表结合的数据
const car = (id) => {
  return new Promise((resolve, reject) => {
    db.query('select * from cart left join product on cart.product_id = product.id where cart.user_id=?', [id], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

//查询购物车数据

const cart = (id) => {
  return new Promise((resolve, reject) => {
    db.query('select * from cart where user_id=?', [id], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

//修改购物车表
const add = (option) => {
  return new Promise((resolve, reject) => {
    db.query('insert into cart(user_id, product_id, num, active) values (?, ?, ?, ?)', [3, option.id, option.num, 1], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

//修改购物车表
const change = (opt) => {
  return new Promise((resolve, reject) => {
    db.query(`update cart set num=? where product_id=${opt.id}`, [opt.num], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

//删除购物车
const deleteCar = (userId, pid) => {
  return new Promise((resolve, reject) => {
    console.log(userId, pid)
    db.query('delete from cart where user_id=? and product_id=?', [userId, pid], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

const changeAct = (act, userId, pid) => {
  return new Promise((resolve, reject) => {
    db.query('update cart set active=? where user_id=? and product_id=?', [act, userId, pid], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

const getPri = (userId) => {
  return new Promise((resolve, reject) => {
    db.query("select * from cart where user_id=? and active='1'", [userId], (error, res) => {
      if (error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = {
  car,
  add,
  change,
  cart,
  deleteCar,
  changeAct,
  getPri
}