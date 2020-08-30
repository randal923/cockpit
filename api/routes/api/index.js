const router = require('express').Router()

router.use('/usuarios', require('./usuarios'))
router.use('/carros', require('./carros'))
router.use('/marcas', require('./marcas'))

module.exports = router
