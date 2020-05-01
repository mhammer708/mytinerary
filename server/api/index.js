const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/plans', require('./plans'))
router.use('/bills', require('./bills'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
