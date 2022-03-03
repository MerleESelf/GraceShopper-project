const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

// adding access to poster routes below
router.use('/posters', require('./posters'))

router.use('/cart', require('./cart'))

