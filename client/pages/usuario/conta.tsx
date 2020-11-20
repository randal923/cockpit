import styled from 'styled-components'
import Input from '../../Components/Input/index'
import { useSelector, useDispatch } from 'react-redux'
import {useState} from 'react'
import Button from '@material-ui/core/Button'
import { updateUser } from '../../redux/usuario'

const Conta = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("fakepassword123")
  const [disabled, setDisabled] = useState(true)
  const usuario = useSelector(state => state.auth.usuario)
  const dispatch = useDispatch()

  function handleOnChange (setIdentifierState, event) {
    setDisabled(false)
    setIdentifierState(event.target.value);
  }

  function handleOnClick() {
    dispatch(updateUser(email, password))
  }

  function handleOnFocus(e) {
    e.target.value = ''
  }

  function handleOnBlur(e) {
    e.target.value = password
  }

  return (
    <Container>
      <h1>Editar meu perfil</h1>
      <Form>
        <Input defaultValue={usuario?.nome} label={"Nome"} type={"text"} disabled />
        <Input defaultValue={usuario?.sobreNome} label={"Sobre Nome"} type={"text"} disabled/>
        <Input defaultValue={usuario?.email} label={"Email"} type={"email"} onChange={handleOnChange.bind(this, setEmail)}/>
        <Input defaultValue={password} label={"Senha"} type={"password"} onChange={handleOnChange.bind(this, setPassword)} onFocus={handleOnFocus} onBlur={handleOnBlur}/>
        <Button id="salvar" variant="contained" color="secondary" onClick={handleOnClick} disabled={disabled}>
            <a>SALVAR ALTERAÇÕES</a>
        </Button>
      </Form>

    </Container>
  )
}

export default Conta

const Container = styled.div`
  width: 100%;
  height: 100%;

  h1 {
    border-bottom: var(--material-border);
    padding: 15px;
    font-size: 1.8rem;
  }
`

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .input{
    padding: 0 20px;
  }

  .MuiButton-containedSecondary {
    background-color: var(--red);
    margin: 20px 15px;

    :hover {
      background-color: var(--button-hover);
    }
  }
  .MuiButton-root {
    font-size: 1.4rem;
  }
`