import { getHeaders } from './localStorage'
import axios from 'axios'
import { api } from '../config'
import errorHandling from './errorHandling'
import { GET_MARCAS, GET_MARCA, LIMPAR_MARCA, REMOVE_MARCA, GET_MARCA_CARROS } from './types'

export const getMarcas = () => {
  return function (dispatch) {
    axios
      .get(`${api}/marcas`, getHeaders())
      .then((response) => dispatch({ type: GET_MARCAS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const salvarMarca = (marca, cb) => {
  return function (dispatch) {
    axios
      .post(
        `${api}/marcas`,
        {
          nome: marca.nome
        },
        getHeaders()
      )
      .then((response) => {
        dispatch({ type: GET_MARCAS, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}

export const getMarca = (id) => {
  return function (dispatch) {
    axios
      .get(`${api}/marcas/${id}`, getHeaders())
      .then((response) => dispatch({ type: GET_MARCA, payload: response.data }))
      .catch(errorHandling)
  }
}

export const limparMarca = () => ({ type: LIMPAR_MARCA })

export const getMarcaCarros = (id, atual, limit) => {
  return function (dispatch) {
    axios
      .get(`${api}/marcas/${id}/carros?&offset=${atual}&limit=${limit}`, getHeaders())
      .then((response) => dispatch({ type: GET_MARCA_CARROS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const updateMarca = (marca, id, cb) => {
  return function (dispatch) {
    axios
      .put(
        `${api}/marcas/${id}`,
        {
          nome: marca.nome
        },
        getHeaders()
      )
      .then((response) => {
        dispatch({ type: GET_MARCA, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}

export const removerMarca = (id, cb) => {
  return function (dispatch) {
    axios
      .delete(`${api}/marcas/${id}`, getHeaders())
      .then((response) => {
        dispatch({ type: REMOVE_MARCA, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}
