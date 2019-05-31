const food = require('../model/food.js')
const getFood = async (req, res, next) => {
  const foods = await food.food()
  console.log(foods)
  res.send(foods)
}



module.exports = {
  getFood
}