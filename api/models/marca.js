const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')

const MarcaSchema = Schema(
  {
    nome: { type: String, required: true, unique: true },
    carros: { type: [{ type: Schema.Types.ObjectId, ref: 'Carro' }] }
  },
  { timestamps: true }
)

MarcaSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Marca', MarcaSchema)
