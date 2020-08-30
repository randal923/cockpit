const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const CarroSchema = Schema(
  {
    modelo: { type: String, required: true },
    localizacao: { type: String, required: true },
    motor: { type: String, required: true },
    cambio: { type: String, required: true },
    sobrealimentado: { type: String, required: true },
    suspencao: { type: String, required: true },
    estilo: { type: String, required: true },
    carroceria: { type: String, required: true },
    cor: { type: String, required: true },
    cilindrada: { type: String, required: true },
    ano: { type: String, required: true },
    fotos: { type: Array, default: [] },
    preco: { type: Number, required: true },
    promocao: { type: Number },
    marca: { type: Schema.Types.ObjectId, ref: 'Marca' }
  },
  { timestamps: true }
)

CarroSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Carro', CarroSchema)
