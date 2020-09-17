const router = require('express').Router()

const MarcaController = require('../../controllers/MarcaController')

const auth = require('../auth')
const asyncErrorHandler = require('express-async-handler')

const marcaController = new MarcaController()

router.get('/', asyncErrorHandler(marcaController.index))
router.get('/:id', asyncErrorHandler(marcaController.show))

router.post('/', auth.required, auth.admin, asyncErrorHandler(marcaController.store))
router.put('/:id', auth.required, auth.admin, asyncErrorHandler(marcaController.update))
router.delete('/:id', auth.required, auth.admin, asyncErrorHandler(marcaController.remove))

// CARROS
router.get('/:id/carros', asyncErrorHandler(marcaController.showCarros))
router.put('/:id/carros', auth.required, auth.admin, asyncErrorHandler(marcaController.updateCarros))

module.exports = router
