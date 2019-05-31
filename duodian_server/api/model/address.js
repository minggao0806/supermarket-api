const db = require('../../config/index.js')

const address = (list) => {
  return new Promise((resolve, reject) => {
    db.query("insert into address(user_id, name, phone, location, address, active) values (?, ?, ?, ?, ?, ?)",[3, list.name, list.phone, list.location, list.address, 1], (error, res) => {
      if (error) {
        reject
      } else {
        resolve(res)
      }
    })
  })
}

const view = (id) => {
  return new Promise((resolve, reject) => {
    console.log(id)
    db.query('select * from address where user_id=?', [id], (error, res) => {
      if(error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}

const change = (list) => {
  return new Promise((resolve, reject) => {
    db.query(`update address set user_id=?, name=?, phone=?, location=?, address=?, active=? where id=${list.id}`,[3, list.name, list.phone, list.location, list.address, 1], (error, res) => {
      if(error) {
        reject()
      } else {
        resolve(res)
      }
    })
  })
}
module.exports = {
  address,
  view,
  change
}