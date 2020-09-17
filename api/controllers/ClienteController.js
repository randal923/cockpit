const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente')
const Usuario = mongoose.model('Usuario')

class ClienteController {
  /**
   *
   * ADMIN
   */

  // GET / index
  async index(req, res) {
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 30

    const clientes = await Cliente.paginate({}, { offset, limit, populate: { path: 'usuario', select: '-salt -hash' } })
    return res.send({ clientes })
  }

  // GET /search/:search
  async search(req, res) {
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 30
    const search = new RegExp(req.params.search, 'i')

    const clientes = await Cliente.paginate(
      {
        $or: [{ $text: { $search: search, $diacriticSensitive: false } }]
      },
      { offset, limit, populate: { path: 'usuario', select: '-salt -hash' } }
    )
    return res.send({ clientes })
  }

  // GET /admin/:id
  async showAdmin(req, res, next) {
    const cliente = await Cliente.findOne({ _id: req.params.id }).populate({
      path: 'usuario',
      select: '-salt -hash'
    })

    return res.send({ cliente })
  }

  // PUT /admin/:id
  async updateAdmin(req, res) {
    const { nome, cpf, email, telefones, endereco, dataDeNascimento } = req.body

    const cliente = await Cliente.findById(req.params.id).populate({ path: 'usuario', select: '-salt -hash' })
    if (nome) {
      cliente.usuario.nome = nome
      cliente.nome = nome
    }
    if (email) cliente.usuario.email = email
    if (cpf) cliente.cpf = cpf
    if (telefones) cliente.telefones = telefones
    if (endereco) cliente.endereco = endereco
    if (dataDeNascimento) cliente.dataDeNascimento = dataDeNascimento

    await cliente.usuario.save()
    await cliente.save()

    return res.send({ cliente })
  }

  async removeAdmin(req, res, next) {
    const cliente = await Cliente.findById(req.params.id).populate('usuario')
    if (!cliente) return res.status(400).send({ error: 'Cliente nao encontrado.' })

    await cliente.usuario.remove()
    await cliente.remove()

    return res.send({ deletado: true })
  }

  /**
   *
   * CLIENTE
   */
  async show(req, res) {
    const cliente = await Cliente.findOne({ usuario: req.payload.id }).populate({
      path: 'usuario',
      select: '-salt -hash'
    })

    return res.send({ cliente })
  }

  async store(req, res) {
    const { nome, sobreNome, email, cpf, telefones, endereco, dataDeNascimento, password } = req.body

    const usuario = new Usuario({ nome, sobreNome, email })

    usuario.setSenha(password)

    const cliente = new Cliente({
      nome,
      sobreNome,
      cpf,
      telefones,
      endereco,
      dataDeNascimento,
      usuario: usuario._id
    })

    await usuario.save()
    await cliente.save()

    return res.send({ cliente: Object.assign({}, cliente._doc, { email: usuario.email }) })
  }

  async update(req, res) {
    const { nome, sobreNome, email, cpf, telefones, endereco, dataDeNascimento, password } = req.body

    const cliente = await Cliente.findOne({ usuario: req.payload.id }).populate('usuario')
    if (!cliente) return res.send({ error: 'Cliente não existe.' })

    if (nome) {
      cliente.usuario.nome = nome
      cliente.nome = nome
    }
    if (sobreNome) {
      cliente.usuario.sobreNome = sobreNome
      cliente.sobreNome = sobreNome
    }
    if (email) cliente.usuario.email = email
    if (password) cliente.usuario.setSenha(password)
    if (cpf) cliente.cpf = cpf
    if (telefones) cliente.telefones = telefones
    if (endereco) cliente.endereco = endereco
    if (dataDeNascimento) cliente.dataDeNascimento = dataDeNascimento

    await cliente.usuario.save()
    await cliente.save()

    cliente.usuario = {
      email: cliente.usuario.email,
      _id: cliente.usuario._id,
      permissao: cliente.usuario.permissao
    }

    return res.send({ cliente })
  }

  async remove(req, res) {
    const cliente = await Cliente.findOne({ usuario: req.payload.id }).populate('usuario')

    await cliente.usuario.remove()

    cliente.deletado = true
    await cliente.save()

    return res.send({ deletado: true })
  }
}

module.exports = ClienteController
