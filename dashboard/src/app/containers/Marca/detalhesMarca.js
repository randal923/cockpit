import React, { Component } from 'react'
import Titulo from '../../components/Texto/Titulo'
import ButtonSimples from '../../components/Button/Simples'
import { TextoDados } from '../../components/Texto/Dados'
import InputValor from '../../components/Inputs/InputValor'

import Voltar from '../../components/Links/Voltar'

import { connect } from 'react-redux'
import AlertGeral from '../../components/Alert/Geral'
import * as actions from '../../actions/marcas'

class DetalhesMarca extends Component {
  generateStateMarca = (props) => ({
    nome: props.marca ? props.marca.nome : ''
  })

  constructor(props) {
    super()
    this.state = {
      ...this.generateStateMarca(props),
      erros: {},
      aviso: null
    }
  }

  componentWillUpdate(nextProps) {
    if (
      (!this.props.marca && nextProps.marca) ||
      (this.props.marca && nextProps.marca && this.props.marca.updatedAt !== nextProps.marca.updatedAt)
    )
      this.setState(this.generateStateMarca(nextProps))
  }

  salvarMarca() {
    const { usuario, marca } = this.props
    if (!usuario || !marca) return null
    if (!this.validate()) return null
    this.props.updateMarca(this.state, marca._id, (error) => {
      this.setState({
        aviso: {
          status: !error,
          msg: error ? error.message : 'Marca atualizada com sucesso'
        }
      })
    })
  }

  removerMarca() {
    const { usuario, marca } = this.props

    if (!usuario || !marca) return null

    if (!window.confirm('Você realmente deseja remover essa marca?')) return

    this.props.removerMarca(marca._id, (error) => {
      if (error) this.setState({ aviso: { status: false, msg: error.message } })
      else this.props.history.goBack()
    })
  }

  renderCabecalho() {
    const { nome } = this.state
    return (
      <div className="flex">
        <div className="flex-1 flex">
          <Titulo tipo="h1" titulo={nome} />
        </div>
        <div className="flex-1 flex flex-end">
          <ButtonSimples onClick={() => this.salvarMarca()} type="success" label="Salvar" />
          <ButtonSimples onClick={() => this.removerMarca()} type="danger" label="Remover" />
        </div>
      </div>
    )
  }

  onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())

  validate() {
    const { nome } = this.state
    const erros = {}

    if (!nome) erros.nome = 'Preencha aqui com o nome da marca'

    this.setState({ erros })
    return !(Object.keys(erros).length > 0)
  }

  renderDados() {
    const { nome, erros } = this.state
    return (
      <div>
        <TextoDados
          chave="Nome"
          valor={
            <InputValor
              name="nome"
              noStyle
              value={nome}
              erro={erros.nome}
              handleSubmit={(valor) => this.onChangeInput('nome', valor)}
            />
          }
        />
      </div>
    )
  }

  render() {
    return (
      <div className="Detalhes-Categoria">
        <Voltar history={this.props.history} />
        <AlertGeral aviso={this.state.aviso} />
        {this.renderCabecalho()}
        {this.renderDados()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  marca: state.marca.marca,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(DetalhesMarca)
