const jwt = require('express-jwt')
const secret = require('../config').secret

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
    User.findById(req.payload.id).then((user) => {
      if (!user) return res.sendStatus(401)
      if (!user.role.includes('admin')) return res.sendStatus(401)
      next()
    })
  }
}

module.exports = auth
