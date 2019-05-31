const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user : "root",
  password : "gfyyzs1378436",
  database : 'soul'
})

connection.connect((error) => {
  if (error) {
    console.log('连接失败')
  } else {
    console.log('连接成功')
  }
})

module.exports = connection