const router = require('express').Router()
const {Trip, Place, Plan} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const plans = await Plan.findAll({
      include: [{model: Trip}, {model: Place}],
    })
    res.send(plans)
  } catch (err) {
    next(err)
  }
})

router.get('/:tripId', async (req, res, next) => {
  try {
    const plans = await Plan.findAll({
      where: {tripId: req.params.tripId},
      include: [{model: Trip}, {model: Place}],
    })
    res.send(plans)
  } catch (err) {
    next(err)
  }
})
