import axios from 'axios'

const types = {
  GET_CARROS: 'GET_CARROS'
}

export const getCarros = () => async (dispatch) => {
  const carros = await axios.get('http://localhost:5000/carros')
  return dispatch({
    type: types.GET_CARROS,
    payload: carros.data
  })
}

const carrosReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.GET_CARROS:
      return {
        ...state,
        carros: payload.carros
      }
    default:
      return state
  }
}

export default carrosReducer
