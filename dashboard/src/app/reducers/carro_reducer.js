import { GET_CARROS, GET_CARRO, LIMPAR_CARRO } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CARROS:
      return {
        ...state,
        carros: action.payload.carros
      }
    case GET_CARRO:
      return {
        ...state,
        carro: action.payload.carro
      }
    case LIMPAR_CARRO:
      return {
        ...state,
        carro: null
      }
    default:
      return state
  }
}
