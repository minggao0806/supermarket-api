var express = require('express');
var router = express.Router();

const userController = require('./controller/user')
const classifyController = require('./controller/classify.js')
const foodController = require('./controller/food.js')
const productController = require('./controller/product.js')

const addAddressController = require('./controller/address.js')

const checkLogin = require('./middleware/checkLogin.js')

const carController = require('./controller/car.js')

router.post('/user/login', userController.login)
router.get('/user/info', checkLogin, userController.info)
router.get('/user/getCode', userController.msgCode)

router.get('/home/getBanner', productController.banner)
router.get('/product/food', foodController.getFood)

router.get('/classify/list', productController.list)

router.post('/address/addAddress', addAddressController.addAddress)
router.get('/address/view', checkLogin, addAddressController.view)
router.post('/address/change', addAddressController.change)

router.get('/car/getList', checkLogin, carController.getList)
router.post('/car/add', checkLogin, carController.addList)
router.get('/car/delete', checkLogin, carController.deleteCar)
router.get('/car/changeActive', checkLogin, carController.changeActive)
router.get('/car/getPrice', checkLogin, carController.getPrice)

module.exports = router;
