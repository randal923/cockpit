import axios from 'axios'
import config from '../utils/config'

const types = {
  GET_CARROS: 'GET_CARROS',
  GET_SEARCHED_CARROS: 'GET_SEARCHED_CARROS',
  GET_CARRO: 'GET_CARRO'
}

export const getCarros = () => async (dispatch) => {
  const carros = await axios.get('http://localhost:5000/carros')
  return dispatch({
    type: types.GET_CARROS,
    payload: carros.data
  })
}

export const searchCarros = (search: any) => async (dispatch) => {
  const searchedCarros = await axios.post('http://localhost:5000/carros/search', search)
  return dispatch({
    type: types.GET_SEARCHED_CARROS,
    payload: searchedCarros.data.carros.docs
  })
}

export const getCarro = (_id: string | string[]) => async (dispatch) => {
  const carro = await axios.get(`${config.api}/carros/${_id}`)
  return dispatch({
    type: types.GET_CARRO,
    payload: carro.data.carro
  })
}

const carrosReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.GET_CARROS:
      return {
        ...state,
        carros: payload.carros
      }
    case types.GET_SEARCHED_CARROS:
      return {
        ...state,
        searchedCarros: payload
      }
    case types.GET_CARRO:
      return {
        ...state,
        carro: payload
      }
    default:
      return state
  }
}

export default carrosReducer
