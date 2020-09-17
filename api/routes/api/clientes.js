const router = require('express').Router()

const ClienteController = require('../../controllers/ClienteController')
const auth = require('../auth')
const asyncErrorHandler = require('express-async-handler')

const clienteController = new ClienteController()

// ADMIN
router.get('/', auth.required, auth.admin, asyncErrorHandler(clienteController.index))
router.get('/search/:search', auth.required, auth.admin, asyncErrorHandler(clienteController.search))
router.get('/admin/:id', auth.required, auth.admin, asyncErrorHandler(clienteController.showAdmin))

router.delete('/admin/:id', auth.required, auth.admin, clienteController.removeAdmin)

router.put('/admin/:id', auth.required, auth.admin, asyncErrorHandler(clienteController.updateAdmin))

// CLIENTE
router.get('/:id', auth.required, asyncErrorHandler(clienteController.show))
router.post('/', asyncErrorHandler(clienteController.store))
router.put('/:id', auth.required, asyncErrorHandler(clienteController.update))
router.delete('/:id', auth.required, clienteController.remove)

module.exports = router
