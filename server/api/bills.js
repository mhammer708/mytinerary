const router = require('express').Router()
const {Trip, Bill, Plan, User, Group} = require('../db/models')
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
    const bills = await Bill.findAll({
      where: {tripId: req.params.tripId},
      include: [{model: Trip}, {model: Plan}],
    })
    res.send(bills)
  } catch (err) {
    next(err)
  }
})

router.post('/:tripId', async (req, res, next) => {
  try {
    const billOwner = await User.findOne({
      where: {username: req.body.formData.payer},
    })
    const billPayees = await Group.findAll({
      where: {tripId: req.params.tripId},
    })
    const newBill = await Bill.create({
      price: req.body.formData.amount,
      note: req.body.formData.memo,
      tripId: req.params.tripId,
      planId: req.body.planId,
    })
    await newBill.createTransaction({
      amount: req.body.formData.amount * -1,
      type: 'credit',
      userId: billOwner.id,
      tripId: req.params.tripId,
    })

    const createDebits = () => {
      return Promise.all(
        billPayees.map((billPayee) =>
          newBill.createTransaction({
            amount: req.body.formData.amount / billPayees.length,
            type: 'debit',
            userId: billPayee.userId,
            tripId: req.params.tripId,
          })
        )
      )
    }
    await createDebits()
    // console.log('magic', Object.keys(Bill.prototype))
    res.send(newBill)
  } catch (err) {
    next(err)
  }
})
