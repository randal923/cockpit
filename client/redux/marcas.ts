import axios from 'axios'
import config from '../utils/config'

const types = {
  GET_MARCAS: 'GET_MARCAS'
}

export const getMarcas = () => async (dispatch) => {
  const marcas = await axios.get(`${config.api}/marcas`)

  return dispatch({
    type: types.GET_MARCAS,
    payload: marcas.data
  })
}

const marcasReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.GET_MARCAS:
      return {
        ...state,
        marcas: payload.marcas
      }
    default:
      return state
  }
}

export default marcasReducer