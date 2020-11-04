import { combineReducers } from 'redux'
import marcasReducer from './marcas'
import carrosReducer from './carros'
import authReducer from './auth'
import errorReducer from './error'
import snackReducer from './snack'

const reducers = {
  marcas: marcasReducer,
  carros: carrosReducer,
  auth: authReducer,
  error: errorReducer,
  snack: snackReducer
}
export default combineReducers(reducers)