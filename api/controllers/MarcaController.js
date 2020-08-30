const mongoose = require('mongoose')

const Marca = mongoose.model('Marca')
const Carro = mongoose.model('Carro')

class MarcaController {
  // GET / index
  async index(req, res) {
    const marcas = await Marca.find().select('_id carros nome')

    return res.send({ marcas })
  }

  // GET /:id show
  async show(req, res) {
    const marca = await Marca.findOne({ _id: req.params.id }).select('_id carros nome').populate(['carros'])
    return res.send({ marca })
  }

  // POST / store
  async store(req, res) {
    const { nome } = req.body

    const marca = new Marca({ nome })
    await marca.save()

    return res.send({ marca })
  }

  // PUT /:id update
  async update(req, res) {
    const { nome, carros } = req.body

    const marca = await Marca.findById(req.params.id)

    if (nome) marca.nome = nome
    if (carros) categoria.carros = carros

    await marca.save()
    return res.send({ marca })
  }

  // DELETE /:id remove
  async remove(req, res) {
    const marca = await Marca.findById(req.params.id)

    await marca.remove()
    return res.send({ deletado: true })
  }

  /**
   * CARROS
   */
  // GET /:id/carros - showcarros
  async showCarros(req, res, next) {
    const { offset, limit } = req.query

    const carros = await Carro.paginate(
      { marca: req.params.id },
      { offset: Number(offset) || 0, limit: Number(limit) || 30 }
    )
    return res.send({ carros })
  }

  // PUT /:id/carros - updateCarros
  async updateCarros(req, res) {
    const marca = await Marca.findById(req.params.id)
    const { carros } = req.body

    if (carros) marca.carros = carros

    await marca.save()

    let _carros = await Carro.find({
      $or: [{ marca: req.params.id }, { _id: { $in: carros } }]
    })

    _carros = await Promise.all(
      _carros.map(async (carro) => {
        if (!carros.includes(carro._id.toString())) {
          carro.marca = null
        } else {
          carro.marca = req.params.id
        }
        await carro.save()
        return carro
      })
    )

    const resultado = await Carro.paginate({ marca: req.params.id }, { offset: 0, limit: 30 })

    return res.send({ carros: resultado })
  }
}

module.exports = MarcaController
