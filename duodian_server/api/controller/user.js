const db = require('../../config/index.js')
const user = require('../model/user.js')
const jwt = require('jsonwebtoken')
let code = ''

const login = async (req, res, next) => {
  const { phone, code } = req.body
  const msgCode = req.session.code
  console.log(msgCode)
  if (!msgCode) {
    res.status(402).send({
      msg: '验证码超时，请重新发送'
    })
  } else if (msgCode && msgCode !== code) {
    res.status(402).send({
      msg: '验证码错误'
    })
  } else {
    // try {
      const userInfo = await user.findUser(phone)
      const token = jwt.sign(userInfo, 'ming0806')
      res.cookie('token', token, {maxAge: 60*1000*60})
      res.send({
        msg: '登陆成功',
        token
      })
    // } catch {
    //   res.status(402).send({
    //     msg: '用户不存在'
    //   })
    // }
  }
  
  

}

const info = (req, res, next) => {
  res.send(req.userInfo)
}



const msgCode = (req, res, next) => {
  let { phone } = req.query
  while (code.length < 6) {
    code += parseInt(Math.random() * 10)
  }
  req.session.code = code
  res.send({
    msg: '验证码已发送至' + phone + '值为[' + code + ']'
  })
}

module.exports = {
  login,
  info,
  msgCode
}