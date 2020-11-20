import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/usuario'
import locations from '../../utils/city_states.json'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'

const CriarAnuncio = () => {

  const [marca, setMarca] = useState('')

  const [modelo, setModelo] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [descricao, setDescricao] = useState('')
  const [motor, setMoto] = useState('')
  const [cambio, setCambio] = useState('')
  const [sobrealimentado, setSobrealimentado] = useState('')
  const [suspencao, setSuspencao] = useState('')
  const [estilo, setEstilo] = useState('')
  const [carroceria, setCarroceria] = useState('')
  const [cor, setCor] = useState('')
  const [cilindrada, setCilindrada] = useState('')
  const [ano, setAno] = useState('')
  const [quilometragem, setQuilometragem] = useState('')
  const [combustivel, setCombustivel] = useState('')
  const [fotos, setFotos] = useState('')
  const [preco, setPreco] = useState(0)

  // Items
  const [airbag, setAirbag] = useState(false)
  const [alarme, setAlarme] = useState('')
  const [arQuente, setArQuente] = useState('')
  const [regulagemDeAltura, setRegulagemDeAltura] = useState('')
  const [computadorDeBordo, setComputadorDeBordo] = useState('')
  const [controleDeTracao, setControleDeTracao] = useState('')
  const [desembacadorTraseiro, setDesembarcadorTraseiro] = useState('')
  const [arCondicionado, setArCondicionado] = useState('')
  const [esconstoDeCabecaTraseiro, setEncostoDeCabecaTraseiro] = useState('')
  const [abs, setAbs] = useState('')
  const [limpadorTraseiro, setLimpadorTraseiro] = useState('')
  const [controleDeVelocidade, setControleDeVelocidade] = useState('')
  const [radio, setRadio] = useState('')
  const [retrovisoresEletrico, setRetrovisoresEletrico] = useState('')
  const [rodasLigaLeve, setRodaLigaLeve] = useState('')
  const [sensorDeChuva, setSensorDeChuva] = useState('')
  const [sensorDeEstacionamento, setSensorDeEstacionamento] = useState('')
  const [tetoSolar, setTetoSolar] = useState('')
  const [retrovisorFotocromico, setRetrovisorFotocromico] = useState('')
  const [travasEletricas, setTravasEletricas] = useState('')
  const [vidrosEletricos, setVidrosEletricos] = useState('')
  const [bancoEmCouro, setBancoEmCouro] = useState('')
  const [farolDeXenonio, setFarolDeXenonio] = useState('')
  const [gps, setGps] = useState('')

  const dispatch = useDispatch()

  function handleOnChange (setIdentifierState, event) {
    setIdentifierState(event.target.value);
  }

  const handleEstadoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEstado(event.target.value as string)
    setCidade('')
  }

  const handleCidadeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCidade(event.target.value as string)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAirbag(event.target.checked)
  }

  function handleOnClick () {
    console.log(modelo)
    //dispatch(createCar(carro.modelo))
    console.log(locations)
  }

  return (
    <Container>
      <h2>Preencha os campos abaixo para criar um anúncio.</h2>
      <form noValidate autoComplete="on">
          <TextField
            id="outlined-text-input"
            label="Modelo"
            type="text"
            autoComplete="modelo"
            variant="outlined"
            onChange={handleOnChange.bind(this, setModelo)}
          />
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={estado}
              onChange={handleEstadoChange}
              label="Estado"
            >
            {
              Object.entries(locations.states).map(state => {
                return (
                  <MenuItem value={state[0]}>{state[1]}</MenuItem>
                )
              })
            }
            </Select>
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={cidade}
              onChange={handleCidadeChange}
              label="Cidade"
            >
            {
              estado ? (
                locations.cities.map(city => {
                  if(city.state_id.toString() === estado) {
                    return (
                      <MenuItem value={city.id}>{city.name}</MenuItem>
                    )
                  }
                }
              )
              ) : (
                <MenuItem value={''}>Selecione um estado.</MenuItem>
              )
            }
            </Select>
        </FormControl>
        <Switches>
          <div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>
          <div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>
          <div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>
          <div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
            <div>
              <h4>Air Bag</h4>
              <Switch
                checked={airbag}
                onChange={handleChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>
        </Switches>
      </form>
      <Button variant="contained" color="secondary" onClick={handleOnClick}>
        Criar Anúncio
      </Button>
    </Container>
  )
}

export default CriarAnuncio

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .MuiFormControl-root {
      margin: 10px 0;
      width: 200px;
    }
  }

  .MuiButton-containedSecondary {
    background-color: var(--red);
    width: 150px;

    :hover {
      background-color: var(--button-hover);
    }
  }
  .MuiButton-root {
    font-size: 1.4rem;
  }
`

const Switches = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    h4 {
      font-size: 1.2rem;
      margin: 0;
    }

    div {
      display: flex;
      flex-direction: column;
      margin: 5px 10px;
    }
  }
`