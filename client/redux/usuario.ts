import axios from 'axios'
import config from '../utils/config'
import { getCookieFromBrowser } from '../utils/cookie'
import { errorHandler } from './error';
import { showSnack } from './snack'
import { getHeaders } from '../utils/getHeaders'
import { logOut } from './auth'

const types = {
  UPDATE_USER: 'UPDATE_USER',
  AUTHENTICATE_USER: 'AUTHENTICATE_USER',
  LOG_OUT: 'LOG_OUT',
  REGISTER_USER: 'REGISTER_USER',
  RECOVER_USER: 'RECOVER_USER',
  COMPLETE_RECOVER: 'COMPLETE_RECOVER'
}

export const registerUser = (nome: string, sobreNome: string, email: string, password: string) => async (dispatch) => {
  try {
    await axios.post(`${config.api}/usuarios/registrar`, {nome, sobreNome, email, password})
    dispatch(showSnack('success', 'Usuario registrado com sucesso.'))
    dispatch({ type: types.REGISTER_USER, payload: {} })
  }catch(error) {
    dispatch(errorHandler(error))
  }
}

export const recoverUser = (email: string) => async (dispatch) => {
  try {
    await axios.post(`${config.api}/usuarios/recuperar-senha`, {email})
    dispatch(showSnack('success', 'Usuario recuperado com sucesso. Por favor, confira seu email.'))
    dispatch({ type: types.RECOVER_USER, payload: {} })
  }catch(error) {
    dispatch(errorHandler(error))
  }
}

export const completeRecover = (token: string | string[], password: string) => async (dispatch) => {
  try {
    await axios.post(`${config.api}/usuarios/senha-recuperada`, {token, password})
    dispatch(showSnack('success', 'Senha alterada com sucesso.'))
    dispatch({ type: types.COMPLETE_RECOVER, payload: {} })
  }catch(error) {
    dispatch(errorHandler(error))
  }
}

export const updateUser = (email: string, password: string) => async (dispatch) => {
  try {
    const token = getCookieFromBrowser('token')
    await axios.put(`${config.api}/usuarios`, {email, password}, getHeaders(token))
    dispatch(logOut())
    dispatch(showSnack('success', 'Alterações salvas com sucesso. Por favor, faça um novo login.'))
    dispatch({ type: types.UPDATE_USER, payload: {} })
  }catch(error) {
    dispatch(errorHandler(error))
  }
}

const usuarioReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.UPDATE_USER:
      return {}
    case types.REGISTER_USER:
      return payload
    case types.COMPLETE_RECOVER:
      return payload
    default:
      return state
  }
}

export default usuarioReducer
