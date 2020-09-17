import React, { Component } from 'react'

import Titulo from '../../components/Texto/Titulo'

import Tabela from '../../components/Tabela/Simples'
import Paginacao from '../../components/Paginacao/Simples'

import { connect } from 'react-redux'
import * as actions from '../../actions/marcas'

class ListaDeCarros extends Component {
  state = {
    atual: 0,
    limit: 5
  }

  getMarcaCarros(props) {
    const { atual, limit } = this.state
    const { usuario, marca } = props
    if (!usuario || !marca) return null
    this.props.getMarcaCarros(marca._id, atual, limit)
  }

  componentWillMount() {
    this.getMarcaCarros(this.props)
  }

  componentWillUpdate(nextProps) {
    if ((!this.props.usuario && nextProps.usuario) || (!this.props.marca && nextProps.marca))
      this.getMarcaCarros(nextProps)
  }

  changeNumeroAtual = (atual) => this.setState({ atual }, () => this.getMarcaCarros(this.props))

  render() {
    const { marcaCarros } = this.props

    const dados = []
    ;(marcaCarros ? marcaCarros.docs : []).forEach((item) => {
      dados.push({
        Carro: item.modelo,
        botaoDetalhes: `/carro/${item._id}`
      })
    })

    return (
      <div className="ListaDeProdutos">
        <br />
        <hr />
        <Titulo tipo="h3" titulo="Carros da Marca" />
        <br />
        <Tabela cabecalho={['Carro']} dados={dados} />
        <Paginacao
          atual={this.state.atual}
          total={this.props.marcaCarros ? this.props.marcaCarros.total : 0}
          limite={this.state.limit}
          onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  marcaCarros: state.marca.marcaCarros,
  marca: state.marca.marca,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(ListaDeCarros)
