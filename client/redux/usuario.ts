import axios from 'axios'
import config from '../utils/config'
import { setCookie, removeCookie } from '../utils/cookie'
import Router from 'next/router'
import { errorHandler } from './error';
import { showSnack } from './snack'

const types = {
  UPDATE_USER: 'UPDATE_USER',
  AUTHENTICATE_USER: 'AUTHENTICATE_USER',
  LOG_OUT: 'LOG_OUT'
}


export const updateUser = () => async (dispatch) => {
  try {
    
  }catch(error) {
    dispatch(errorHandler(error))
  }
}

const usuarioReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.UPDATE_USER:
      return {
        ...state,
        usuario: payload.usuario
      }
  }
}

export default usuarioReducer
