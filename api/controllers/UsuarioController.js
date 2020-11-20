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
    if (!usuario) return res.status(401).json({ error: 'Usuario não registrado' })

    return res.json({ usuario: usuario.enviarAuthJSON() })
  }

  // GET /:id
  async show(req, res) {
    const usuario = await Usuario.findById(req.params.id)
    if (!usuario) return res.status(401).json({ error: 'Usuario não registrado' })

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
    const { email, password } = req.body

    const usuario = await Usuario.findById(req.payload.id)
    if (!usuario) return res.status(401).json({ error: 'Usuario não registrado' })

    if (typeof email !== 'undefined') usuario.email = email
    if (typeof password !== 'undefined') usuario.setSenha(password)

    await usuario.save()
    return res.json({ usuario: usuario.enviarAuthJSON() })
  }

  // DELETE /
  async remove(req, res, next) {
    const usuario = await Usuario.findById(req.payload.id)
    if (!usuario) return res.status(401).json({ error: 'Usuario não registrado' })

    await usuario.remove()
    return res.json({ deletado: true })
  }

  // POST /login
  async login(req, res, next) {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({ email })

    if (!usuario) return res.status(401).json({ error: 'Usuario não registrado' })
    if (!usuario.validarSenha(password)) return res.status(401).json({ error: 'Senha inválida' })

    return res.json({ usuario: usuario.enviarAuthJSON() })
  }

  // RECOVERY

  // POST /recuperar-senha
  async createRecovery(req, res, next) {
    const { email } = req.body
    if (!email) return res.status(401).json({ error: 'Email não registrado' })

    const usuario = await Usuario.findOne({ email })
    if (!usuario) return res.status(401).json({ error: 'Usuario não registrado' })

    const recoveryData = usuario.criarTokenRecuperacaoSenha()

    await usuario.save()

    enviarEmailRecovery({ usuario, recovery: recoveryData })

    return res.send({success: 'Email enviado com sucesso'})
  }

    // GET /senha-recuperada
  async showCompleteRecovery(req, res, next) {
    if (!req.query.token) return res.send({ error: 'Token não identificada'})

    const usuario = await Usuario.findOne({ 'recovery.token': req.query.token })
    if (!usuario) return res.send({ error: 'Não existe usuário com este token'})

    if (new Date(usuario.recovery.date) < new Date()) {
      return res.send({ error: 'Token expirado. Tente novamente.'})
    }

    return res.send({token: req.query.token })
  }

    // POST /senha-recuperada
  async completeRecovery(req, res, next) {
    console.log('body', req.body)
    const { token, password } = req.body

    if (!token || !password) {
      return res.send({error: 'Preencha novamente com sua nova senha', token: token})
    }

    const usuario = await Usuario.findOne({ 'recovery.token': token })
    if (!usuario) return res.send({ error: 'Usuario nao identificado'})

    usuario.finalizarTokenRecuperacaoSenha()
    usuario.setSenha(password)

    await usuario.save()

    return res.send({success: 'Senha alterada com sucesso. Tente fazer o login novamente.'})
  }
  

  // ADMIN

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
}

module.exports = UsuarioController
