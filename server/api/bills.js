const router = require('express').Router()
const {Trip, Bill, Plan} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const bills = await Bill.findAll({
      include: [{model: Trip}, {model: Plan}],
    })
    res.send(bills)
  } catch (err) {
    next(err)
  }
})

router.get('/:tripId', async (req, res, next) => {
  try {
    const bills = await Bill.findByPk(req.params.tripId, {
      include: [{model: Trip}, {model: Plan}],
    })
    res.send(bills)
  } catch (err) {
    next(err)
  }
})
