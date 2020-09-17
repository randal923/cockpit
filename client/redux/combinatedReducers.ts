import { combineReducers } from 'redux'
import marcasReducer from './marcas'
import carrosReducer from './carros';

const reducers = {
  marcas: marcasReducer,
  carros: carrosReducer
}
export default combineReducers(reducers)