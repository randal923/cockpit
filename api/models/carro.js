const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const CarroSchema = Schema(
  {
    modelo: { type: String, required: true },
    localizacao: { type: String, required: true },
    descricao: { type: String, required: true },
    motor: { type: String, required: true },
    cambio: { type: String, required: true },
    sobrealimentado: { type: String, required: true },
    suspencao: { type: String, required: true },
    estilo: { type: String, required: true },
    carroceria: { type: String, required: true },
    cor: { type: String, required: true },
    cilindrada: { type: String, required: true },
    ano: { type: String, required: true },
    quilometragem: { type: String, required: true },
    combustivel: { type: String, required: true },
    fotos: { type: Array, default: [] },
    preco: { type: Number, required: true },
    promocao: { type: Number },
    marca: { type: Schema.Types.ObjectId, ref: 'Marca' },
    items: {
      airbag: { type: Boolean, default: false },
      alarme: { type: Boolean, default: false },
      arQuente: { type: Boolean, default: false },
      regulagemDeAltura: { type: Boolean, default: false },
      computadorDeBordo: { type: Boolean, default: false },
      controleDeTracao: { type: Boolean, default: false },
      desembacadorTraseiro: { type: Boolean, default: false },
      arCondicionado: { type: Boolean, default: false },
      esconstoDeCabecaTraseiro: { type: Boolean, default: false },
      abs: { type: Boolean, default: false },
      limpadorTraseiro: { type: Boolean, default: false },
      controleDeVelocidade: { type: Boolean, default: false },
      radio: { type: Boolean, default: false },
      retrovisoresEletrico: { type: Boolean, default: false },
      rodasLigaLeve: { type: Boolean, default: false },
      sensorDeChuva: { type: Boolean, default: false },
      sensorDeEstacionamento: { type: Boolean, default: false },
      tetoSolar: { type: Boolean, default: false },
      retrovisorFotocromico: { type: Boolean, default: false },
      travasEletricas: { type: Boolean, default: false },
      vidrosEletricos: { type: Boolean, default: false },
      bancoEmCouro: { type: Boolean, default: false },
      farolDeXenonio: { type: Boolean, default: false },
      gps: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
)

CarroSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Carro', CarroSchema)
