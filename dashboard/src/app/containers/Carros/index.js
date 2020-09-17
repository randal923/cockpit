import React, { Component } from 'react'
import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'
import Tabela from '../../components/Tabela/Simples'
import Paginacao from '../../components/Paginacao/Simples'
import { Link } from 'react-router-dom'

import * as actions from '../../actions/carros'
import { connect } from 'react-redux'

class Carros extends Component {
  state = {
    pesquisa: '',
    atual: 0,
    limit: 5,
    ordem: 'alfabetica_a-z'
  }

  getCarros(props) {
    const { atual, limit, pesquisa, ordem } = this.state
    const { usuario } = props

    if (!usuario) return null

    if (pesquisa) props.getCarrosPesquisa(pesquisa, ordem, atual, limit)
    else props.getCarros(ordem, atual, limit)
  }

  componentWillMount() {
    this.getCarros(this.props)
    this.props.limparCarro()
  }
  componentWillUpdate(nextProps) {
    if (!this.props.usuario && nextProps.usuario) this.getCarros(nextProps)
  }

  handleSubmitPesquisa() {
    this.setState({ atual: 0 }, () => this.getCarros(this.props))
  }

  onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value })

  changeNumeroAtual = (atual) => this.setState({ atual }, () => this.getCarros(this.props))

  changeOrdem = (ev) => this.setState({ ordem: ev.target.value }, () => this.getCarros(this.props))

  renderBotaoNovo = () => {
    return (
      <Link className="button button-success button-small" to="/carros/novo">
        <i className="fas fa-plus"></i>
        <span>&nbsp;Novo Carro</span>
      </Link>
    )
  }

  render() {
    const { pesquisa, ordem } = this.state
    const { carros } = this.props

    const dados = []
    ;(carros ? carros.docs : []).forEach((item) => {
      dados.push({
        Carro: item.modelo,
        Marca: item.marca ? item.marca.nome : '',
        Preço: item.preco,
        botaoDetalhes: `/carro/${item._id}`
      })
    })

    return (
      <div className="Produtos full-width">
        <div className="Card">
          <Titulo tipo="h1" titulo="Carros" />
          {this.renderBotaoNovo()}
          <br />
          <br />
          <div className="flex">
            <div className="flex-3">
              <Pesquisa
                valor={pesquisa}
                placeholder={'Pesquise aqui pelo nome do carro ou marca...'}
                onChange={(ev) => this.onChangePesquisa(ev)}
                onClick={() => this.handleSubmitPesquisa()}
              />
            </div>
            <div className="flex-1 flex vertical">
              <label>
                <small>Ordenar por</small>
              </label>
              <select value={ordem} onChange={this.changeOrdem}>
                <option value={''}>Aleatório</option>
                <option value={'alfabetica_a-z'}>Alfabética A-Z</option>
                <option value={'alfabetica_z-a'}>Alfabética Z-A</option>
                <option value={'preco-crescente'}>Preço Menor</option>
                <option value={'preco-decrescente'}>Preço Maior</option>
              </select>
            </div>
            <div className="flex-1"></div>
          </div>
          <br />
          <Tabela cabecalho={['Carro', 'Marca', 'Preço']} dados={dados} />
          <Paginacao
            atual={this.state.atual}
            total={this.props.carros ? this.props.carros.total : 0}
            limite={this.state.limit}
            onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  carros: state.carro.carros,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Carros)
