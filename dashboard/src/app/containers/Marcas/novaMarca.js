import React, { Component } from 'react'
import Titulo from '../../components/Texto/Titulo'
import ButtonSimples from '../../components/Button/Simples'
import InputSimples from '../../components/Inputs/Simples'
import Voltar from '../../components/Links/Voltar'

import { connect } from 'react-redux'
import AlertGeral from '../../components/Alert/Geral'
import * as actions from '../../actions/marcas'

class NovaMarca extends Component {
  state = {
    nome: '',
    erros: {},
    aviso: null
  }

  validate = () => {
    const { nome } = this.state
    const erros = {}

    if (!nome) erros.nome = 'Preencha aqui com o nome da categoria'

    this.setState({ erros })
    return !(Object.keys(erros).length > 0)
  }

  salvarMarca() {
    const { usuario } = this.props
    if (!usuario) return null
    if (!this.validate()) return null
    this.props.salvarMarca(this.state, (error) => {
      this.setState({
        aviso: {
          status: !error,
          msg: error ? error.message : 'Marca criada com sucesso!'
        }
      })
    })
  }

  renderCabecalho() {
    const { nome } = this.state
    return (
      <div className="flex">
        <div className="flex-1 flex">
          <Titulo tipo="h1" titulo={nome || 'Nova Marca'} />
        </div>
        <div className="flex-1 flex flex-end">
          <ButtonSimples onClick={() => this.salvarMarca()} type="success" label="Salvar" />
        </div>
      </div>
    )
  }

  onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())

  renderDados() {
    const { nome, erros } = this.state
    return (
      <div className="flex-2">
        <InputSimples
          name="nome"
          label="Nome:"
          value={nome}
          erro={erros.nome}
          onChange={(ev) => this.onChangeInput('nome', ev.target.value)}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="Nova-Categoria full-width">
        <div className="Card">
          <Voltar history={this.props.history} />
          <AlertGeral aviso={this.state.aviso} />
          {this.renderCabecalho()}
          <div className="flex horizontal">
            {this.renderDados()}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(NovaMarca)
