import React, { Component } from 'react'
import Titulo from '../../components/Texto/Titulo'
import Button from '../../components/Button/Simples'
import { TextoDados } from '../../components/Texto/Dados'
import InputSelect from '../../components/Inputs/Select'
import InputSimples from '../../components/Inputs/Simples'
import Voltar from '../../components/Links/Voltar'

import { connect } from 'react-redux'
import * as actionsCarros from '../../actions/carros'
import * as actionsMarcas from '../../actions/marcas'

import AlertGeral from '../../components/Alert/Geral'

class NovoCarro extends Component {
  state = {
    modelo: '',
    marca: '',
    localizacao: '',
    motor: '',
    cambio: '',
    sobrealimentado: '',
    suspencao: '',
    estilo: '',
    carroceria: '',
    cor: '',
    cilindrada: '',
    ano: '',
    preco: 0,
    promocao: 0,
    aviso: null,
    erros: {}
  }

  getMarcas(props) {
    const { usuario, getMarcas } = props
    if (usuario) getMarcas()
  }

  componentWillMount() {
    this.getMarcas(this.props)
  }
  componentWillUpdate(nextProps) {
    if (!this.props.usuario && nextProps.usuario) this.getMarcas(nextProps)
  }

  validate() {
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
      preco,
      promocao
    } = this.state
    const erros = {}

    if (!modelo) erros.modelo = 'Preencha aqui com o modelo do carro'
    if (!localizacao) erros.localizacao = 'Preencha aqui com a localizacao do carro'
    if (!motor) erros.motor = 'Preencha aqui com o motor do carro'
    if (!cambio) erros.cambio = 'Preencha aqui com o cambio do carro'
    if (!sobrealimentado) erros.sobrealimentado = 'Preencha aqui com a sobrealimentação do carro'
    if (!suspencao) erros.suspencao = 'Preencha aqui com o suspencao do carro'
    if (!estilo) erros.estilo = 'Preencha aqui com o estilo do carro'
    if (!carroceria) erros.carroceria = 'Preencha aqui com o carroceria do carro'
    if (!cor) erros.cor = 'Preencha aqui com o cor do carro'
    if (!cilindrada) erros.cilindrada = 'Preencha aqui com o cilindrada do carro'
    if (!ano) erros.ano = 'Preencha aqui com o ano do carro'
    if (!preco) erros.preco = 'Preencha aqui com o preco do carro'
    if (!promocao) erros.promocao = 'Preencha aqui com o promocao do carro'

    this.setState({ erros })
    return !(Object.keys(erros).length > 0)
  }

  salvarCarro() {
    const { usuario, salvarCarro } = this.props
    if (!usuario) return null
    salvarCarro(this.state, (error) => {
      this.setState({ aviso: { status: !error, msg: error ? error.message : 'Carro criado com sucesso' } })
    })
  }

  renderCabecalho() {
    const { modelo } = this.state
    return (
      <div className="flex">
        <div className="flex-1 flex vertical">
          <Titulo tipo="h1" titulo={modelo || 'Novo Carro'} />
        </div>
        <div className="flex-1 flex flex-end">
          <Button type="success" label="Salvar" onClick={() => this.salvarCarro()} />
        </div>
      </div>
    )
  }

  onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())

  renderDados() {
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
      preco,
      promocao,
      erros
    } = this.state
    const { marcas } = this.props
    return (
      <div className="Dados-Produto">
        <InputSimples
          name="Modelo"
          label="Modelo:"
          value={modelo}
          error={erros.modelo}
          onChange={(ev) => this.onChangeInput('modelo', ev.target.value)}
        />
        <br />
        <TextoDados
          chave="Categoria"
          valor={
            <InputSelect
              name="marcas"
              onChange={(ev) => this.onChangeInput('marca', ev.target.value)}
              value={marcas}
              error={erros.marcas}
              opcoes={[
                { label: 'Selecionar...', value: '' },
                ...(marcas || []).map((item) => ({ label: item.nome, value: item._id }))
              ]}
            />
          }
        />
        <br />
        <TextoDados
          chave="Localização"
          vertical
          valor={
            <div>
              <textarea
                name={'localizacao'}
                onChange={(ev) => this.onChangeInput('localizacao', ev.target.value)}
                value={localizacao}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.localizacao && <small className="small-danger">{erros.localizacao}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Motor"
          vertical
          valor={
            <div>
              <textarea
                name={'motor'}
                onChange={(ev) => this.onChangeInput('motor', ev.target.value)}
                value={motor}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.motor && <small className="small-danger">{erros.motor}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Cambio"
          vertical
          valor={
            <div>
              <textarea
                name={'cambio'}
                onChange={(ev) => this.onChangeInput('cambio', ev.target.value)}
                value={cambio}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.cambio && <small className="small-danger">{erros.cambio}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Ano"
          vertical
          valor={
            <div>
              <textarea
                name={'ano'}
                onChange={(ev) => this.onChangeInput('ano', ev.target.value)}
                value={ano}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.ano && <small className="small-danger">{erros.ano}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Sobrealimentado"
          vertical
          valor={
            <div>
              <textarea
                name={'sobrealimentado'}
                onChange={(ev) => this.onChangeInput('sobrealimentado', ev.target.value)}
                value={sobrealimentado}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.sobrealimentado && <small className="small-danger">{erros.sobrealimentado}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Suspenção"
          vertical
          valor={
            <div>
              <textarea
                name={'suspencao'}
                onChange={(ev) => this.onChangeInput('suspencao', ev.target.value)}
                value={suspencao}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.suspencao && <small className="small-danger">{erros.suspencao}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Estilo"
          vertical
          valor={
            <div>
              <textarea
                name={'estilo'}
                onChange={(ev) => this.onChangeInput('estilo', ev.target.value)}
                value={estilo}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.estilo && <small className="small-danger">{erros.estilo}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Carroceria"
          vertical
          valor={
            <div>
              <textarea
                name={'carroceria'}
                onChange={(ev) => this.onChangeInput('carroceria', ev.target.value)}
                value={carroceria}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.carroceria && <small className="small-danger">{erros.carroceria}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Cor"
          vertical
          valor={
            <div>
              <textarea
                name={'cor'}
                onChange={(ev) => this.onChangeInput('cor', ev.target.value)}
                value={cor}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.cor && <small className="small-danger">{erros.cor}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Cilindrada"
          vertical
          valor={
            <div>
              <textarea
                name={'cilindrada'}
                onChange={(ev) => this.onChangeInput('cilindrada', ev.target.value)}
                value={cilindrada}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.cilindrada && <small className="small-danger">{erros.cilindrada}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Preço"
          vertical
          valor={
            <div>
              <textarea
                name={'preco'}
                onChange={(ev) => this.onChangeInput('preco', ev.target.value)}
                value={preco}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.preco && <small className="small-danger">{erros.preco}</small>}
            </div>
          }
        />
        <br />
        <TextoDados
          chave="Promoção"
          vertical
          valor={
            <div>
              <textarea
                name={'promocao'}
                onChange={(ev) => this.onChangeInput('promocao', ev.target.value)}
                value={promocao}
                rows="10"
                style={{ resize: 'none' }}
              />
              {erros.promocao && <small className="small-danger">{erros.promocao}</small>}
            </div>
          }
        />
      </div>
    )
  }

  render() {
    return (
      <div className="Novo-Produto full-width">
        <div className="Card">
          <Voltar history={this.props.history} />
          {this.renderCabecalho()}
          <AlertGeral aviso={this.state.aviso} />
          <br />
          <div className="flex horizontal">
            <div className="flex-1 flex vertical">{this.renderDados()}</div>
            <div className="flex-1 flex vertical"></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  carro: state.carro.carro,
  marcas: state.marca.marcas,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, { ...actionsMarcas, ...actionsCarros })(NovoCarro)
