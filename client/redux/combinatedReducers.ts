import { combineReducers } from 'redux'
import marcasReducer from './marcas'
import carrosReducer from './carros'
import authReducer from './auth'

const reducers = {
  marcas: marcasReducer,
  carros: carrosReducer,
  usuario: authReducer
}
export default combineReducers(reducers)