const router = require('express').Router()

router.use('/usuarios', require('./usuarios'))
router.use('/carros', require('./carros'))
router.use('/marcas', require('./marcas'))
router.use('/clientes', require('./clientes'))

module.exports = router
