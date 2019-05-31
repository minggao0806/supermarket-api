const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  // const { token } = req.headers
  const token = req.cookies.token
  console.log(token)
  const info = jwt.decode(token, 'ming0806')
  if (info) {
    req.userInfo = info
    next()
  } else {
    res.status(401).send({
      msg: '用户未登录'
    })
  }
}