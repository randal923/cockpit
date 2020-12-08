import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import locations from '../../utils/city_states.json'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import { getMarcas } from '../../redux/marcas'
import { createCarro } from '../../redux/carros'

const CriarAnuncio = () => {
  const dispatch = useDispatch()
  const marcas = useSelector((state) => state.marcas?.marcas)
  const [marca, setMarca] = useState<any>()

  const [modelo, setModelo] = useState('')
  const [estado, setEstado] = useState<any>()
  const [cidade, setCidade] = useState('')
  const [descricao, setDescricao] = useState('')
  const [motor, setMotor] = useState('')
  const [cambio, setCambio] = useState('')
  const [sobrealimentado, setSobrealimentado] = useState('')
  const [suspencao, setSuspencao] = useState('')
  const [estilo, setEstilo] = useState('')
  const [carroceria, setCarroceria] = useState('')
  const [cor, setCor] = useState('')
  const [cilindrada, setCilindrada] = useState('')
  const [ano, setAno] = useState(0)
  const [quilometragem, setQuilometragem] = useState(0)
  const [combustivel, setCombustivel] = useState('')
  const [preco, setPreco] = useState(0)

  const [items, setItems] = useState({
    airbag: false,
    alarme: false,
    arQuente: false,
    regulagemDeAltura: false,
    computadorDeBordo: false,
    controleDeTracao: false,
    desembacadorTraseiro: false,
    arCondicionado: false,
    esconstoDeCabecaTraseiro: false,
    abs: false,
    limpadorTraseiro: false,
    radio: false,
    retrovisoresEletrico: false,
    rodasLigaLeve: false,
    sensorDeChuva: false,
    sensorDeEstacionamento: false,
    tetoSolar: false,
    retrovisorFotocromico: false,
    travasEletricas: false,
    vidrosEletricos: false,
    bancoEmCouro: false,
    farolDeXenonio: false,
    gps: false,
  })

  function handleOnChange (setIdentifierState, event) {
    setIdentifierState(event.target.value);
  }

  const handleEstadoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEstado(event.target.value)
    setCidade('')
  }

  const handleCidadeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCidade(event.target.value as string)
  }

  const handleMarcaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMarca(event.target.value)
  }

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItems({ ...items, [event.target.name]: event.target.checked });
  };

  function handleOnClick () {
    const state = estado ? JSON.parse(estado) : ''
    const make = marca ? JSON.parse(marca) : ''
    dispatch(createCarro({modelo, estado: state.name, marcaId: make.id, cidade, descricao, motor, cambio, sobrealimentado, suspencao, estilo, carroceria, cor, cilindrada, ano, quilometragem, combustivel, preco, items}))
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
            <InputLabel id="demo-simple-select-outlined-label">Marcas</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={marca ?? ""}
              onChange={handleMarcaChange}
              label="Marcas"
            >
            {
              marcas && marcas.map(marca => (
                <MenuItem value={JSON.stringify({id: marca._id, nome: marca.nome })} key={marca.id}>{marca.nome}</MenuItem>
              ))
            }
            </Select>
        </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={estado ?? ""}
              onChange={handleEstadoChange}
              label="Estado"
            >
            {
              Object.entries(locations.states).map(state => {
                return (
                  <MenuItem value={JSON.stringify({id: state[0], name: state[1]})}>{state[1]}</MenuItem>
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
              value={cidade ?? ""}
              onChange={handleCidadeChange}
              label="Cidade"
            >
            {
              estado ? (
                locations.cities.map(city => {
                  const state = JSON.parse(estado)
                  if(city.state_id.toString() === state.id) {
                    return (
                      <MenuItem value={city.name}>{city.name}</MenuItem>
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
        <TextField
            id="outlined-text-input"
            label="Descrição"
            type="text"
            autoComplete="descricao"
            variant="outlined"
            onChange={handleOnChange.bind(this, setDescricao)}
          />
          <TextField
            id="outlined-text-input"
            label="Motor"
            type="text"
            autoComplete="motor"
            variant="outlined"
            onChange={handleOnChange.bind(this, setMotor)}
          />
          <TextField
            id="outlined-text-input"
            label="Cambio"
            type="text"
            autoComplete="cambio"
            variant="outlined"
            onChange={handleOnChange.bind(this, setCambio)}
          />
          <TextField
            id="outlined-text-input"
            label="Sobrealimentação"
            type="text"
            autoComplete="sobrealimentado"
            variant="outlined"
            onChange={handleOnChange.bind(this, setSobrealimentado)}
          />
          <TextField
            id="outlined-text-input"
            label="Suspenção"
            type="text"
            autoComplete="suspencao"
            variant="outlined"
            onChange={handleOnChange.bind(this, setSuspencao)}
          />
          <TextField
            id="outlined-text-input"
            label="Estilo"
            type="text"
            autoComplete="estilo"
            variant="outlined"
            onChange={handleOnChange.bind(this, setEstilo)}
          />
          <TextField
            id="outlined-text-input"
            label="Carroceria"
            type="text"
            autoComplete="carroceria"
            variant="outlined"
            onChange={handleOnChange.bind(this, setCarroceria)}
          />
          <TextField
            id="outlined-text-input"
            label="Cor"
            type="text"
            autoComplete="cor"
            variant="outlined"
            onChange={handleOnChange.bind(this, setCor)}
          />
          <TextField
            id="outlined-text-input"
            label="Cilindrada"
            type="text"
            autoComplete="cilindrada"
            variant="outlined"
            onChange={handleOnChange.bind(this, setCilindrada)}
          />
          <TextField
            id="outlined-text-input"
            label="Quilometragem"
            type="number"
            autoComplete="quilometragem"
            variant="outlined"
            onChange={handleOnChange.bind(this, setQuilometragem)}
          />
          <TextField
            id="outlined-text-input"
            label="Ano"
            type="number"
            autoComplete="ano"
            variant="outlined"
            onChange={handleOnChange.bind(this, setAno)}
          />
          <TextField
            id="outlined-text-input"
            label="Cambustível"
            type="text"
            autoComplete="combustivel"
            variant="outlined"
            onChange={handleOnChange.bind(this, setCombustivel)}
          />
          <TextField
            id="outlined-text-input"
            label="Preço"
            type="number"
            autoComplete="modelo"
            variant="outlined"
            onChange={handleOnChange.bind(this, setPreco)}
          />
        <Switches>
          <div>
            <h4>Air Bag</h4>
              <Switch
                checked={items.airbag}
                onChange={handleItemChange}
                name="airbag"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />

              
              <h4>Alarme</h4>
              <Switch
                checked={items.alarme}
                onChange={handleItemChange}
                name="alarme"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Ar Quente</h4>
              <Switch
                checked={items.arQuente}
                onChange={handleItemChange}
                name="arQuente"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Regulagem de <br /> Altura</h4>
              <Switch
                checked={items.regulagemDeAltura}
                onChange={handleItemChange}
                name="regulagemDeAltura"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Computador de Bordo</h4>
              <Switch
                checked={items.computadorDeBordo}
                onChange={handleItemChange}
                name="computadorDeBordo"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Controle de Tração</h4>
              <Switch
                checked={items.controleDeTracao}
                onChange={handleItemChange}
                name="controleDeTracao"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Desenbaçador Traseiro</h4>
              <Switch
                checked={items.desembacadorTraseiro}
                onChange={handleItemChange}
                name="desembacadorTraseiro"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Ar Condicionado</h4>
              <Switch
                checked={items.arCondicionado}
                onChange={handleItemChange}
                name="arCondicionado"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Encosto de Cabeça Traseiro</h4>
              <Switch
                checked={items.esconstoDeCabecaTraseiro}
                onChange={handleItemChange}
                name="esconstoDeCabecaTraseiro"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>ABS</h4>
              <Switch
                checked={items.abs}
                onChange={handleItemChange}
                name="abs"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />

              <h4>Limpado Traseiro</h4>
              <Switch
                checked={items.limpadorTraseiro}
                onChange={handleItemChange}
                name="limpadorTraseiro"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />

              <h4>Rádio</h4>
              <Switch
                checked={items.radio}
                onChange={handleItemChange}
                name="radio"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
          
          </div>

          <div>
          
              <h4>Retrovisor Elétrico</h4>
              <Switch
                checked={items.retrovisoresEletrico}
                onChange={handleItemChange}
                name="retrovisoresEletrico"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Rodas de Liga Leve</h4>
              <Switch
                checked={items.rodasLigaLeve}
                onChange={handleItemChange}
                name="rodasLigaLeve"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Sensor de Chuva</h4>
              <Switch
                checked={items.sensorDeChuva}
                onChange={handleItemChange}
                name="sensorDeChuva"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Sensor de <br />Estacionamento</h4>
              <Switch
                checked={items.sensorDeEstacionamento}
                onChange={handleItemChange}
                name="sensorDeEstacionamento"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Této Solar</h4>
              <Switch
                checked={items.tetoSolar}
                onChange={handleItemChange}
                name="tetoSolar"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Retrovisor Fotocrômico</h4>
              <Switch
                checked={items.retrovisorFotocromico}
                onChange={handleItemChange}
                name="retrovisorFotocromico"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Travas Elétricas</h4>
              <Switch
                checked={items.travasEletricas}
                onChange={handleItemChange}
                name="travasEletricas"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Vidros Elétricos</h4>
              <Switch
                checked={items.vidrosEletricos}
                onChange={handleItemChange}
                name="vidrosEletricos"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>Bancos em <br />Couro</h4>
              <Switch
                checked={items.bancoEmCouro}
                onChange={handleItemChange}
                name="bancoEmCouro"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
              <h4>Farol de Xenônio</h4>
              <Switch
                checked={items.farolDeXenonio}
                onChange={handleItemChange}
                name="farolDeXenonio"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            
          
        
          
              <h4>GPS</h4>
              <Switch
                checked={items.gps}
                onChange={handleItemChange}
                name="gps"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
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

CriarAnuncio.getInitialProps = async (ctx) => {
  const marcas = await ctx.store.dispatch(getMarcas())
  return { marcas }
}

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
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 25px 0;
    width: 50%;
    h4 {
      font-size: 1.4rem;
    }
  }
`