import React, { Component } from 'react'
import Titulo from '../../components/Texto/Titulo'

import Button from '../../components/Button/Simples'

import { TextoDados } from '../../components/Texto/Dados'
import InputSelect from '../../components/Inputs/Select'
import InputValor from '../../components/Inputs/InputValor'

import BlocoImagens from '../../components/Imagens/Bloco'

import Voltar from '../../components/Links/Voltar'

import { connect } from 'react-redux'
import * as actions from '../../actions/carros'
import AlertGeral from '../../components/Alert/Geral'

class DetalhesCarro extends Component {
  generateStateCarro = (props) => ({
    modelo: props.carro ? props.carro.modelo : '',
    marca: props.carro ? props.carro.marca._id || props.carro.marca : '',
    fotos: props.carro ? props.carro.fotos : '',
    preco: props.carro ? props.carro.preco : '',
    promocao: props.carro ? props.carro.promocao : ''
  })

  constructor(props) {
    super()
    this.state = {
      ...this.generateStateCarro(props),
      aviso: null,
      erros: {}
    }
  }

  componentWillUpdate(nextProps) {
    if (
      (!this.props.carro && nextProps.carro) ||
      (this.props.carro && nextProps.carro && this.props.carro.updatedAt !== nextProps.carro.updatedAt)
    )
      this.setState(this.generateStateCarro(nextProps))
  }

  validate() {
    const { modelo, marca, preco } = this.state
    const erros = {}

    if (!modelo) erros.modelo = 'Preencha aqui com o modelo do carro'
    if (!marca) erros.categoria = 'Preencha aqui com a categoria do carro'
    if (!preco) erros.preco = 'Preencha aqui com a preço do carro'

    this.setState({ erros })
    return !(Object.keys(erros).length > 0)
  }

  updateCarro() {
    const { usuario, carro, updateCarro } = this.props
    if (!usuario || !carro || !this.validate()) return null
    updateCarro(this.state, carro._id, (error) => {
      this.setState({
        aviso: {
          status: !error,
          msg: error ? error.message : 'carro atualizado com sucesso'
        }
      })
    })
  }

  renderCabecalho() {
    const { modelo } = this.state
    return (
      <div className="flex">
        <div className="flex-1 flex vertical">
          <Titulo tipo="h1" titulo={modelo} />
        </div>
        <div className="flex-1 flex flex-end">
          <Button type="success" label="Salvar" onClick={() => this.updateCarro()} />
        </div>
      </div>
    )
  }

  onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())

  renderDados() {
    const { modelo, marca, preco, promocao, erros } = this.state
    const { marcas } = this.props

    return (
      <div className="Dados-carro">
        <TextoDados
          chave="Modelo"
          valor={
            <InputValor
              value={modelo}
              noStyle
              name="modelo"
              erro={erros.modelo}
              handleSubmit={(valor) => this.onChangeInput('modelo', valor)}
            />
          }
        />
        <br />
        <TextoDados
          chave="Marca"
          valor={
            <InputSelect
              name="marca"
              onChange={(ev) => this.onChangeInput('marca', ev.target.value)}
              value={marca}
              opcoes={(marcas || []).map((item) => ({ label: item.nome, value: item._id }))}
            />
          }
        />
        <br />
        <TextoDados
          chave="Preço"
          valor={
            <InputValor
              value={preco}
              noStyle
              name="preco"
              erro={erros.preco}
              handleSubmit={(valor) => this.onChangeInput('preco', valor)}
            />
          }
        />
        <TextoDados
          chave="Valor em Promoção"
          valor={
            <InputValor
              value={promocao}
              noStyle
              name="promocao"
              erro={erros.promocao}
              handleSubmit={(valor) => this.onChangeInput('promocao', valor)}
            />
          }
        />
      </div>
    )
  }

  onRemove = (id) => {
    const { usuario, carro } = this.props
    if (!usuario || !carro) return null
    const { fotos: _fotos } = this.state
    const fotos = _fotos.filter((foto, index) => index !== id)
    if (window.confirm('Você deseja realmente remover essa imagem?')) {
      this.props.removeCarroImagens(fotos, carro._id, (error) => {
        this.setState({
          aviso: {
            status: !error,
            msg: error ? error.message : 'Foto do carro removida com sucesso'
          }
        })
      })
    }
  }

  handleUploadFoto = (ev) => {
    const { usuario, carro } = this.props
    if (!usuario || !carro) return null

    const data = new FormData()
    data.append('files', ev.target.files[0])

    this.props.updateCarroImagem(data, carro._id, (error) => {
      this.setState({
        aviso: {
          status: !error,
          msg: error ? error.message : 'Fotos do carro atualizadas com sucesso'
        }
      })
    })
  }

  renderImagens() {
    const { fotos } = this.state
    return (
      <div className="dados-de-imagens">
        <BlocoImagens imagens={fotos || []} handleSubmit={this.handleUploadFoto} onRemove={this.onRemove} />
      </div>
    )
  }

  render() {
    return (
      <div className="Detalhes-do-Carro">
        <Voltar history={this.props.history} />
        {this.renderCabecalho()}
        <AlertGeral aviso={this.state.aviso} />
        <br />
        <div className="flex horizontal">
          <div className="flex-1 flex vertical">{this.renderDados()}</div>
          <div className="flex-1 flex vertical">{this.renderImagens()}</div>
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

export default connect(mapStateToProps, actions)(DetalhesCarro)
