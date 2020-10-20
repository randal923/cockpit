import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { login } from '../redux/auth'
import { initialize } from '../utils/initialize'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()

  function handleOnChange (setIdentifierState, event) {
    setIdentifierState(event.target.value);
  }

 function handleOnClick () {
    if(email && password) {
      const result = dispatch(login({ email, password }))
    }
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }


  return (
    <Container>
      <h2>Para entrar na sua conta e gerenciar seus dados, incrição e conteudo, preencha abaixo.</h2>
      <form noValidate autoComplete="on">
        <div>
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="email"
            variant="outlined"
            onChange={handleOnChange.bind(this, setEmail)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={handleOnChange.bind(this, setPassword)}
          />
        </div>
      </form>
      <Button variant="contained" color="secondary" onClick={handleOnClick}>
        ENTRAR
      </Button>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </div>
    </Container>
  )
}

export default Login

Login.getInitialProps = async (ctx) => {
  return initialize(ctx)
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  h2 {
    color: black;
    text-align: center;
    max-width: 300px;
  }
  form {
    div {
      display: flex;
      flex-direction: column;
      width: 250px;

      div:first-child {
        margin: 35px 0 5px 0;
      }
      div:last-child {
        margin-bottom: 10px;
      }

      input {
        padding-left: 30px;
        font-size: 1.2rem;
      }
    }
  }

  .MuiButton-containedSecondary {
    background-color: var(--red);

    :hover {
      background-color: var(--button-hover);
    }
  }
  .MuiButton-root {
    font-size: 1.4rem;
  }
`