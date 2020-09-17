import { GET_MARCAS, GET_MARCA, GET_MARCA_CARROS, LIMPAR_MARCA, REMOVE_MARCA } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_MARCAS:
      return {
        ...state,
        marcas: action.payload.marcas
      }
    case GET_MARCA:
      return {
        ...state,
        marca: action.payload.marca
      }
    case LIMPAR_MARCA:
    case REMOVE_MARCA:
      return {
        ...state,
        marca: null
      }
    case GET_MARCA_CARROS:
      return {
        ...state,
        marcaCarros: action.payload.carros
      }
    default:
      return state
  }
}
