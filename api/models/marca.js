const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarcaSchema = Schema(
  {
    nome: { type: String, required: true, unique: true },
    carros: { type: [{ type: Schema.Types.ObjectId, ref: 'Carro' }] }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Marca', MarcaSchema)
