import React, { Component } from 'react'

import DetalhesCarro from './detalhesCarro'

import { connect } from 'react-redux'
import * as actionsCarros from '../../actions/carros'
import * as actionsMarcas from '../../actions/marcas'

class Carro extends Component {
  componentWillMount() {
    const { usuario, getCarro, getMarcas } = this.props
    if (!usuario) return
    const { id } = this.props.match.params
    getCarro(id)
    getMarcas()
  }

  render() {
    return (
      <div className="Produto full-width flex vertical">
        <div className="Card">
          <DetalhesCarro history={this.props.history} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, { ...actionsCarros, ...actionsMarcas })(Carro)
