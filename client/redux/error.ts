const types = {
  ERROR: 'ERROR',
  REMOVE_ERROR: 'REMOVE_ERROR'
}

export const errorHandler = (error) => ({ type: types.ERROR, payload: error })
export const removeError = () => ({ type: types.REMOVE_ERROR, payload: {} })

const errorReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.ERROR:
      return {
        ...state,
        error: payload
      }
    case types.REMOVE_ERROR: 
      return {}
    default:
      return state
  }
}

export default errorReducer
