import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  function handleOnChange (setIdentifierState, event) {
    setIdentifierState(event.target.value);
  }

 function handleOnClick () {
    if(email && password) {
      dispatch(login({ email, password }))
    }
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
      {}
    </Container>
  )
}

export default Login

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