import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'

import { HashRouter as Router, Route } from 'react-router-dom'

import base from './containers/HOC/Base'
import noAuth from './containers/HOC/NoAuth'

import { initApp } from './actions'

// CONTAINER COM BASE

import Clientes from './containers/Clientes'
import Cliente from './containers/Cliente'

import Carros from './containers/Carros'
import Carro from './containers/Carro'
import NovoCarro from './containers/Carros/novoCarro'

import Marcas from './containers/Marcas'
import NovaMarca from './containers/Marcas/novaMarca'
import Marca from './containers/Marca'

// CONTAINER SEM BASE
import Login from './containers/Login'
import RecuperarSenha from './containers/RecuperarSenha'
import ResetarSenha from './containers/RecuperarSenha/ResetarSenha'

class App extends Component {
  componentWillMount() {
    initApp()
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path={'/'} exact component={base(Clientes)} />

            <Route path={'/cliente/:id'} exact component={base(Cliente)} />

            <Route path={'/carros'} exact component={base(Carros)} />
            <Route path={'/carros/novo'} exact component={base(NovoCarro)} />
            <Route path={'/carro/:id'} exact component={base(Carro)} />

            <Route path={'/marcas'} exact component={base(Marcas)} />
            <Route path={'/marcas/nova'} exact component={base(NovaMarca)} />
            <Route path={'/marca/:id'} exact component={base(Marca)} />

            <Route path={'/login'} exact component={noAuth(Login)} />
            <Route path={'/recuperar-senha'} exact component={noAuth(RecuperarSenha)} />
            <Route path={'/resetar-senha/:token'} exact component={noAuth(ResetarSenha)} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
