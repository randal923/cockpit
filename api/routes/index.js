const router = require('express').Router()

router.use('/', require('./api'))
router.get('/', (req, res, next) => res.send({ ok: true }))

module.exports = router
