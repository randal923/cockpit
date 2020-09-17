import React, { Component } from 'react'

import Titulo from '../../components/Texto/Titulo'
import Tabela from '../../components/Tabela/Simples'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../actions/marcas'

class Marcas extends Component {
  getMarcas() {
    const { usuario } = this.props
    if (!usuario) return null
    this.props.getMarcas()
  }

  componentWillMount() {
    this.getMarcas()
  }

  componentWillUpdate(nextProps) {
    if (!this.props.usuario && nextProps.usuario) this.getMarcas()
  }

  renderBotaoNovo() {
    return (
      <Link className="button button-success button-small" to="/marcas/nova">
        <i className="fas fa-plus"></i>
        <span>&nbsp;Nova Marca</span>
      </Link>
    )
  }

  render() {
    const { marcas } = this.props

    const dados = []
    ;(marcas || []).forEach((item) => {
      dados.push({
        Marca: item.nome,
        'Qtd. de Carros': item.carros.length,
        botaoDetalhes: `/marca/${item._id}`
      })
    })

    return (
      <div className="Categorias full-width">
        <div className="Card">
          <Titulo tipo="h1" titulo="Marcas" />
          <br />
          {this.renderBotaoNovo()}
          <br />
          <br />
          <Tabela cabecalho={['Marca', 'Qtd. de Carros']} dados={dados} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  marcas: state.marca.marcas,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Marcas)
