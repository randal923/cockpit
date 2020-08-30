const router = require('express').Router()

const MarcaController = require('../../controllers/MarcaController')

const auth = require('../auth')

const marcaController = new MarcaController()

router.get('/', marcaController.index)
router.get('/:id', marcaController.show)

router.post('/', auth.required, marcaController.store)
router.put('/:id', auth.required, marcaController.update)
router.delete('/:id', auth.required, marcaController.remove)

// CARROS
router.get('/:id/carros', marcaController.showCarros)
router.put('/:id/carros', auth.required, marcaController.updateCarros)

module.exports = router
