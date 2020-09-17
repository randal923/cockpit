import React, { Component } from 'react'

import DetalhesMarca from './detalhesMarca'
import ListaDeCarros from './listaDeCarros'

import { connect } from 'react-redux'
import * as actions from '../../actions/marcas'

class Marca extends Component {
  componentWillMount() {
    const { usuario } = this.props
    const { id } = this.props.match.params
    if (!usuario || !id) return null
    this.props.getMarca(id)
  }

  componentWillUnmount() {
    this.props.limparMarca()
  }

  render() {
    return (
      <div className="Categoria full-width">
        <div className="Card">
          <div>
            <DetalhesMarca history={this.props.history} />
          </div>
          <div>
            <ListaDeCarros />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Marca)
