const router = require('express').Router()
const {Transaction, Bill} = require('../db/models')
module.exports = router

router.get('/:tripId', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        tripId: req.params.tripId,
      },
      include: [{model: Bill}],
    })
    res.send(transactions)
  } catch (err) {
    next(err)
  }
})

router.get('/:tripId/myTransactions', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        tripId: req.params.tripId,
        userId: req.user.id,
      },
      include: Bill,
    })
    res.send(transactions)
  } catch (err) {
    next(err)
  }
})
