const router = require('express').Router()
const {Trip, Place} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Trip.findAll({
      include: Place,
    })
    res.send(products)
  } catch (err) {
    next(err)
  }
})
