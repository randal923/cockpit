import axios from 'axios'

const types = {
  GET_CARROS: 'GET_CARROS',
  GET_SEARCHED_CARROS: 'GET_SEARCHED_CARROS'
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
    default:
      return state
  }
}

export default carrosReducer
