const router = require('express').Router()

const CarroController = require('../../controllers/CarroController')

const auth = require('../auth')
const upload = require('../../config/multer')

const asyncErrorHandler = require('express-async-handler')

const carroController = new CarroController()

// Usuarios
router.post('/', auth.required, asyncErrorHandler(carroController.store))
router.put('/:id', auth.required, asyncErrorHandler(carroController.update))
router.put('/images/:id', auth.required, upload.array('files', 4), asyncErrorHandler(carroController.uploadImages))
router.delete('/:id', auth.required, asyncErrorHandler(carroController.remove))

// CLIENTES/VISITANTES
router.get('/', asyncErrorHandler(carroController.index))
router.post('/search', asyncErrorHandler(carroController.search))
router.get('/:id', asyncErrorHandler(carroController.show))

module.exports = router
