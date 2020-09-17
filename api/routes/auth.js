const jwt = require('express-jwt')
const secret = require('../config').secret
const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario')

function getTokenFromHeader(req) {
  if (!req.headers.authorization) return null
  const token = req.headers.authorization.split(' ')
  if (token[0] !== 'Bearer') return null
  return token[1]
}

const auth = {
  required: jwt({
    secret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),

  optional: jwt({
    secret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  }),

  admin: function isAdmin(req, res, next) {
    Usuario.findById(req.payload.id).then((usuario) => {
      if (!usuario) return res.sendStatus(401)
      if (!usuario.permissao.includes('admin')) return res.sendStatus(401)
      next()
    })
  }
}

module.exports = auth
