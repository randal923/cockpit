import axios from 'axios'
import config from '../utils/config'
import { setCookie, removeCookie } from '../utils/cookie'
import Router from 'next/router'

const types = {
  GET_USER: 'GET_USER',
  AUTHENTICATE_USER: 'AUTHENTICATE_USER',
  LOG_OUT: 'LOG_OUT'
}

interface Login {
  email: string
  password: string
}

interface Usuario {
  nome: string
  sobreNome: string
  email: string
  role: string[]
  carros: string[]
  token: string
}

export const reauthenticate = (token: string) => ({ type: types.AUTHENTICATE_USER, payload: token });

export const login = (login: Login) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${config.api}/usuarios/login`, login)
  
    setCookie('token', data.usuario.token)
    if (data.usuario.token) Router.push('/')
    return dispatch({
      type: types.GET_USER,
      payload: data
    })
  }catch(e) {
    console.log('error', e.name)
  }
}

export const logOut = () => (dispatch) => {
  removeCookie('token')
  Router.push('/')
  dispatch({ type: types.LOG_OUT, payload: {} })
}

const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.GET_USER:
      return {
        ...state,
        usuario: payload.usuario
      }
    case types.AUTHENTICATE_USER:
      return {
        ...state,
        usuario: payload.token
      }
    case types.LOG_OUT:
      return {}
    default:
      return state
  }
}

export default authReducer
