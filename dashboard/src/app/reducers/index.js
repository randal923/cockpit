import { combineReducers } from 'redux'

import authReducer from './auth_reducer'
import clienteReducer from './cliente_reducer'
import carroReducer from './carro_reducer'
import configuracaoReducer from './configuracao_reducer'
import marcaReducer from './marca_reducer'

const reducers = combineReducers({
  auth: authReducer,
  cliente: clienteReducer,
  carro: carroReducer,
  marca: marcaReducer,
  configuracao: configuracaoReducer
})

export default reducers
