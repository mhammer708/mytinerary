const router = require('express').Router()
const {Trip, Place, Plan} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: {
        userId: req.body.userId,
      },
    })
    res.send(trips)
  } catch (err) {
    next(err)
  }
})

router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId, {include: Place})
    res.send(trip)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const trip = await Trip.create(req.body)
    res.send(trip)
  } catch (err) {
    next(err)
  }
})
