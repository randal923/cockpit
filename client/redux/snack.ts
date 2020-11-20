const types = {
  SHOW_SNACK: 'SHOW_SNACK',
  REMOVE_SNACK: 'REMOVE_SNACK'
}

export const showSnack = (type: string, message: string, status?: boolean) => ({ type: types.SHOW_SNACK, payload: {type, message , status: true}})
export const removeSnack = () => ({ type: types.REMOVE_SNACK, payload: {} })

const snackReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SHOW_SNACK:
      return {
        ...state,
        snack: payload
      }
    case types.REMOVE_SNACK: 
      return {}
    default:
      return state
  }
}

export default snackReducer
