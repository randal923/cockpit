const mongoose = require('mongoose')

const Carro = mongoose.model('Carro')
const Marca = mongoose.model('Marca')
const Usuario = mongoose.model('Usuario')

const getSort = (sortType) => {
  switch (sortType) {
    case 'alfabetica_a-z':
      return { titulo: 1 }
    case 'alfabetica_z-a':
      return { titulo: -1 }
    case 'preco-crescente':
      return { preco: 1 }
    case 'preco-decrescente':
      return { preco: -1 }
    default:
      return {}
  }
}

class CarroController {
  // ADMIN

  // POST / - store
  async store(req, res, next) {
    const {
      modelo,
      localizacao,
      motor,
      cambio,
      sobrealimentado,
      suspencao,
      estilo,
      carroceria,
      cor,
      cilindrada,
      ano,
      combustivel,
      quilometragem,
      preco,
      promocao,
      marcaId
    } = req.body

    const carro = new Carro({
      modelo,
      localizacao,
      motor,
      cambio,
      sobrealimentado,
      suspencao,
      estilo,
      carroceria,
      cor,
      cilindrada,
      ano,
      combustivel,
      quilometragem,
      preco,
      promocao,
      marca: marcaId
    })

    const marca = await Marca.findById(marcaId)
    marca.carros.push(carro._id)

    const usuario = await Usuario.findById(req.payload.id)
    usuario.carros.push(carro._id)

    await usuario.save()
    await carro.save()
    await marca.save()

    return res.send({ carro })
  }

  // PUT /:id
  async update(req, res) {
    const {
      modelo,
      localizacao,
      motor,
      cambio,
      sobrealimentado,
      suspencao,
      estilo,
      carroceria,
      cor,
      cilindrada,
      ano,
      combustivel,
      quilometragem,
      preco,
      promocao,
      marca,
      fotos
    } = req.body

    const carro = await Carro.findById(req.params.id)
    if (!carro) return res.status(400).send({ error: 'Carro não encontrado.' })

    /*
    const usuario = await Usuario.findById(req.payload.id)
    const filtro = usuario.carros.filter((item) => item.toString() === carro._id.toString())

    if (filtro.length === 0) return res.status(401).send({ error: 'Usuário não autorizado a modificar esse carro.' })
    */

    if (modelo) carro.modelo = modelo
    if (localizacao) carro.localizacao = localizacao
    if (motor) carro.motor = motor
    if (cambio) carro.cambio = cambio
    if (sobrealimentado) carro.sobrealimentado = sobrealimentado
    if (suspencao) carro.suspencao = suspencao
    if (estilo) carro.estilo = estilo
    if (carroceria) carro.carroceria = carroceria
    if (cor) carro.cor = cor
    if (cilindrada) carro.cilindrada = cilindrada
    if (preco) carro.preco = preco
    if (promocao) carro.promocao = promocao
    if (ano) carro.ano = ano
    if (combustivel) carro.combustivel = combustivel
    if (quilometragem) carro.quilometragem = quilometragem
    if (fotos) carro.fotos = fotos

    if (marca && marca.toString() !== carro.marca.toString()) {
      const oldMarca = await Marca.findById(carro.marca)
      const newMarca = await Marca.findById(marca)

      if (oldMarca && newMarca) {
        oldMarca.carros = oldMarca.carros.filter((item) => item.toString() !== carro._id.toString())
        newMarca.carros.push(carro._id)
        carro.marca = marca
        await oldMarca.save()
        await newMarca.save()
      } else if (newMarca) {
        newMarca.carros.push(carro._id)
        carro.marca = marca
        await newMarca.save()
      }
    }

    await carro.save()

    return res.send({ carro })
  }

  // PUT /images/:id
  async uploadImages(req, res) {
    const carro = await Carro.findOne({ _id: req.params.id })

    if (!carro) return res.status(400).send({ error: 'Carro não encontrado.' })

    const novasImagens = req.files.map((item) => item.filename)
    carro.fotos = carro.fotos.filter((item) => item).concat(novasImagens)

    await carro.save()

    return res.send({ carro })
  }

  // DELETE :/id - remove
  async remove(req, res) {
    const carro = await Carro.findOne({ _id: req.params.id })
    if (!carro) return res.status(400).send({ error: 'Carro não encontrado.' })

    const filtro = usuario.carros.filter((item) => item.toString() === carro._id.toString())

    if (filtro.length === 0) return res.status(401).send({ error: 'Usuário não autorizado a modificar esse carro.' })

    const marca = await Marca.findById(carro.marca)
    if (marca) {
      marca.carros = marca.carros.filter((item) => item !== carro._id)
      await marca.save()
    }

    await carro.remove()
    return res.send({ deleted: true })
  }

  // CLIENTE
  // GET / - index
  async index(req, res) {
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 30

    const carros = await Carro.paginate({}, { offset, limit, sort: getSort(req.query.sortType), populate: ['marca'] })

    return res.send({ carros })
  }

  // get /search/:search - search
  async search(req, res) {
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 30

    const query = req.body

    Object.keys(query).forEach((key) => {
      if (key === 'preco') {
        query[key] = { $gte: query[key][0], $lte: query[key][1] }
      }

      if (key !== 'preco') {
        query[key] = new RegExp(`^${query[key]}$`, 'i')
      }
    })

    const carros = await Carro.paginate(query, {
      offset,
      limit,
      sort: getSort(req.query.sortType),
      populate: ['carro']
    })

    return res.send({ carros })
  }

  async show(req, res) {
    const carro = await Carro.findById(req.params.id).populate(['marca'])
    return res.send({ carro })
  }
}

module.exports = CarroController
