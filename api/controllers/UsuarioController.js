const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
const enviarEmailRecovery = require('../helpers/email-recovery')

class UsuarioController {
  // POST /registrar
  async store(req, res, next) {
    const { nome, sobreNome, email, password } = req.body

    const usuario = new Usuario({ nome, sobreNome, email })
    usuario.setSenha(password)

    await usuario.save()
    return res.json({ usuario: usuario.enviarAuthJSON() })
  }

  // GET /
  async index(req, res) {
    const usuario = await Usuario.findById(req.payload.id)
    if (!usuario) return res.status(401).json({ errors: 'Usuario não registrado' })

    return res.json({ usuario: usuario.enviarAuthJSON() })
  }

  // GET /:id
  async show(req, res) {
    const usuario = await Usuario.findById(req.params.id)
    if (!usuario) return res.status(401).json({ errors: 'Usuario não registrado' })

    return res.json({
      usuario: {
        nome: usuario.nome,
        email: usuario.email,
        permissao: usuario.permissao,
        loja: usuario.loja
      }
    })
  }

  // PUT /
  async update(req, res, next) {
    const { nome, sobreNome, email, password } = req.body

    const usuario = await Usuario.findById(req.payload.id)
    if (!usuario) return res.status(401).json({ errors: 'Usuario não registrado' })

    if (typeof nome !== 'undefined') usuario.nome = nome
    if (typeof sobreNome !== 'undefined') usuario.sobreNome = sobreNome
    if (typeof email !== 'undefined') usuario.email = email
    if (typeof password !== 'undefined') usuario.setSenha(password)

    await usuario.save()
    return res.json({ usuario: usuario.enviarAuthJSON() })
  }

  // DELETE /
  async remove(req, res, next) {
    const usuario = await Usuario.findById(req.payload.id)
    if (!usuario) return res.status(401).json({ errors: 'Usuario não registrado' })

    await usuario.remove()
    return res.json({ deletado: true })
  }

  // POST /login
  async login(req, res, next) {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({ email })

    if (!usuario) return res.status(401).json({ errors: 'Usuario não registrado' })
    if (!usuario.validarSenha(password)) return res.status(401).json({ errors: 'Senha inválida' })

    return res.json({ usuario: usuario.enviarAuthJSON() })
  }

  // RECOVERY

  // GET /recuperar-senha
  showRecovery(req, res, next) {
    return res.render('recovery', { error: null, success: null })
  }

  // POST /recuperar-senha
  async createRecovery(req, res, next) {
    const { email } = req.body
    if (!email) return res.render('recovery', { error: 'Preencha com o seu email', success: null })

    const usuario = await Usuario.findOne({ email })
    if (!usuario) return res.render('recovery', { error: 'Não existe usuário com este email', success: null })
    const recoveryData = usuario.criarTokenRecuperacaoSenha()

    await usuario.save()

    enviarEmailRecovery({ usuario, recovery: recoveryData }, (error = null, success = null) => {
      return res.render('recovery', { error, success })
    })
  }

  async indexAdmin(req, res) {
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 30

    const usuarios = await Usuario.paginate({}, { offset, limit, populate: { path: 'usuario', select: '-salt -hash' } })
    return res.send({ usuarios })
  }

  // GET /admin/:id
  async showAdmin(req, res) {
    const usuario = await Usuario.findOne({ _id: req.params.id })
    return res.send({ usuario })
  }

  // GET /senha-recuperada
  async showCompleteRecovery(req, res, next) {
    if (!req.query.token) return res.render('recovery', { error: 'Token não identificado', success: null })

    const usuario = await Usuario.findOne({ 'recovery.token': req.query.token })
    if (!usuario) return res.render('recovery', { error: 'Não existe usuário com este token', success: null })

    if (new Date(usuario.recovery.date) < new Date()) {
      return res.render('recovery', { error: 'Token expirado. Tente novamente.', success: null })
    }

    return res.render('recovery/store', { error: null, success: null, token: req.query.token })
  }

  // POST /senha-recuperada
  async completeRecovery(req, res, next) {
    const { token, password } = req.body

    if (!token || !password) {
      return res.render('recovery/store', {
        error: 'Preencha novamente com sua nova senha',
        success: null,
        token: token
      })
    }

    const usuario = await Usuario.findOne({ 'recovery.token': token })
    if (!usuario) return res.render('recovery', { error: 'Usuario nao identificado', success: null })

    usuario.finalizarTokenRecuperacaoSenha()
    usuario.setSenha(password)

    await usuario.save()

    return res.render('recovery/store', {
      error: null,
      success: 'Senha alterada com sucesso. Tente novamente fazer login.',
      token: null
    })
  }
}

module.exports = UsuarioController
