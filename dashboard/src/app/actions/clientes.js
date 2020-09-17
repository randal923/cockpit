import { getHeaders } from './localStorage'
import axios from 'axios'
import { api } from '../config'
import errorHandling from './errorHandling'
import { transformeDate } from './index'
import { GET_CLIENTES, GET_CLIENTE, REMOVE_CLIENTE, LIMPAR_CLIENTE } from './types'

export const getClientes = (atual, limit) => {
  return function (dispatch) {
    axios
      .get(`${api}/clientes?offset=${atual}&limit=${limit}`, getHeaders())
      .then((response) => dispatch({ type: GET_CLIENTES, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getClientesPesquisa = (termo, atual, limit) => {
  return function (dispatch) {
    axios
      .get(`${api}/clientes/search/${termo}?offset=${atual}&limit=${limit}`, getHeaders())
      .then((response) => dispatch({ type: GET_CLIENTES, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getCliente = (id) => {
  return function (dispatch) {
    axios
      .get(`${api}/clientes/admin/${id}`, getHeaders())
      .then((response) => dispatch({ type: GET_CLIENTE, payload: response.data }))
      .catch(errorHandling)
  }
}

export const limparCliente = () => ({ type: LIMPAR_CLIENTE })

export const updateCliente = (cliente, id, cb) => {
  return function (dispatch) {
    axios
      .put(
        `${api}/clientes/admin/${id}`,
        {
          nome: cliente.nome,
          sobreNome: cliente.sobreNome,
          cpf: cliente.CPF,
          email: cliente.email,
          telefones: [cliente.telefone],
          endereco: {
            local: cliente.endereco,
            numero: cliente.numero,
            bairro: cliente.bairro,
            cidade: cliente.cidade,
            estado: cliente.estado,
            CEP: cliente.cep
          },
          dataDeNascimento: transformeDate(cliente.dataDeNascimento, '/', 'YYYY-MM-DD')
        },
        getHeaders()
      )
      .then((response) => {
        dispatch({ type: GET_CLIENTE, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}

export const removerCliente = (id, cb) => {
  return function (dispatch) {
    axios
      .delete(`${api}/clientes/admin/${id}`, getHeaders())
      .then((response) => {
        dispatch({ type: REMOVE_CLIENTE, payload: response.data })
        cb(null)
      })
      .catch((e) => cb(errorHandling(e)))
  }
}
