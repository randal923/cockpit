import axios from 'axios'

const types = {
  GET_MARCAS: 'GET_MARCAS'
}

export const getMarcas = () => async (dispatch) => {
  const marcas = await axios.get('http://localhost:5000/marcas')

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