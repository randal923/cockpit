const router = require('express').Router()
const auth = require('../auth')
const UsuarioController = require('../../controllers/UsuarioController')
const asyncErrorHandler = require('express-async-handler')

const usuarioController = new UsuarioController()

router.post('/registrar', asyncErrorHandler(usuarioController.store))
router.post('/login', asyncErrorHandler(usuarioController.login))
router.put('/', auth.required, asyncErrorHandler(usuarioController.update))
router.delete('/', auth.required, asyncErrorHandler(usuarioController.remove))

router.post('/recuperar-senha', asyncErrorHandler(usuarioController.createRecovery))
router.get('/senha-recuperada', asyncErrorHandler(usuarioController.showCompleteRecovery))
router.post('/senha-recuperada', asyncErrorHandler(usuarioController.completeRecovery))

router.get('/', auth.required, asyncErrorHandler(usuarioController.index))
router.get('/:id', auth.required, asyncErrorHandler(usuarioController.show))

// Admin
router.get('/admin', auth.required, auth.admin, asyncErrorHandler(usuarioController.indexAdmin))
router.get('/admin/:id', auth.required, auth.admin, asyncErrorHandler(usuarioController.showAdmin))

module.exports = router
