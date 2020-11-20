const transporter = require('nodemailer').createTransport(require('../config/email'))
const { api } = require('../config/index')

module.exports = ({ usuario, recovery }) => {
  const message = `
        <h1 style="text-align: center;">Recuperacao de Senha</h1>
        <br />
        <p>
            Aqui está o link para redefinir a sua senha. Acesse ele e digite sua nova senha:
        </p>
        <a href="${api}/usuario/senha-recuperada?token=${recovery.token}">
            ${api}/usuario/senha-recuperada?token=${recovery.token}
        </a>
        <br /><br /><hr />
        <p>
            Obs.: Se você não solicitou a redefinição, apenas ignore esse email.
        </p>
        <br />
        <p>Atenciosamente, Cockpit Garage</p>
    `

  const opcoesEmail = {
    from: 'naoresponder@cockpitgarage.com',
    to: usuario.email,
    subject: 'Redefinição de Senha - Cockpit Garage',
    html: message
  }

  if (process.env.NODE_ENV === 'production') {
    transporter.sendMail(opcoesEmail)
  } else {
    console.log(opcoesEmail)
  }
}
