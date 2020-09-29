import { getHeaders } from './localStorage'
import axios from 'axios'
import { api } from '../config'
import errorHandling from './errorHandling'
import { GET_CARROS, GET_CARRO, LIMPAR_CARRO } from './types'

export const getCarros = (ordem, atual, limit) => {
  return function (dispatch) {
    axios
      .get(`${api}/carros?offset=${atual}&limit=${limit}&sortType=${ordem}`, getHeaders())
      .then((response) => dispatch({ type: GET_CARROS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getCarrosPesquisa = (termo, ordem, atual, limit) => {
  return function (dispatch) {
    axios
      .post(
        `${api}/carros/search/?offset=${atual}&limit=${limit}&sortType=${ordem}`,
        {
          modelo: termo
        },
        getHeaders()
      )
      .then((response) => dispatch({ type: GET_CARROS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const salvarCarro = (carro, cb) => {
  return function (dispatch) {
    axios
      .post(
        `${api}/carros`,
        {
          modelo: carro.modelo,
          marcaId: carro.marca,
          motor: carro.motor,
          localizacao: carro.localizacao,
          cambio: carro.cambio,
          sobrealimentado: carro.sobrealimentado,
          suspencao: carro.suspencao,
          estilo: carro.estilo,
          carroceria: carro.carroceria,
          cor: carro.cor,
          cilindrada: carro.cilindrada,
          ano: carro.ano,
          quilometragem: carro.quilometragem,
          combustivel: carro.combustivel,
          preco: carro.preco,
          promocao: carro.promocao
        },
        getHeaders()
      )
      .then((response) => {
        dispatch({ type: GET_CARRO, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}

export const getCarro = (id) => {
  return function (dispatch) {
    axios
      .get(`${api}/carros/${id}`, getHeaders())
      .then((response) => dispatch({ type: GET_CARRO, payload: response.data }))
      .catch(errorHandling)
  }
}

export const limparCarro = () => ({ type: LIMPAR_CARRO })

export const updateCarro = (carro, id, cb) => {
  return function (dispatch) {
    axios
      .put(
        `${api}/carros/${id}`,
        {
          modelo: carro.modelo,
          marca: carro.marca,
          preco: carro.preco,
          promocao: carro.promocao
        },
        getHeaders()
      )
      .then((response) => {
        dispatch({ type: GET_CARRO, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}

export const removeCarroImagens = (fotos, id, cb) => {
  return function (dispatch) {
    axios
      .put(`${api}/carros/${id}`, { fotos }, getHeaders())
      .then((response) => {
        dispatch({ type: GET_CARRO, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}

export const updateCarroImagem = (data, id, cb) => {
  return function (dispatch) {
    axios
      .put(`${api}/carros/images/${id}`, data, getHeaders())
      .then((response) => {
        dispatch({ type: GET_CARRO, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}
