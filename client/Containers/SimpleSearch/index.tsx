import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Select from '../../Components/Select/index'
import RangeSlider from '../../Components/RangeSlider/index'
import { useSelector, useDispatch } from 'react-redux'
import { getMarcas } from '../../redux/marcas'
import { getCarros } from '../../redux/carros'
import {anos} from '../../utils/data'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

interface IOptions {
  label: string
  value: string
}

const SimpleSearch = (): any => {
  const [search, setSearch] = useState({marca: '', modelo: '', ano: ''})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMarcas())
    dispatch(getCarros())
  }, [dispatch])


  const marcas = useSelector((state) => state.marcas.marcas?.map(marca => {
    return {
      label: marca.nome,
      value: 'marca'
    }
  }))

  const carros = useSelector((state) => state.carros.carros?.docs.map((carro) => {
    return {
      label: carro.modelo,
      value: 'modelo'
    }
    })
  )

  function handleOptionChange(e: any) {
    console.log(e.target.value)
    //setSearch((prevState) => ({ ...prevState, [value?.value]: value?.label }))
  }

  return (
    <Container>
      <Select label="Marca" title="Selecione Marca" options={marcas || []} handleOptionChange={handleOptionChange} />
      <Select label="Modelo" title="Selecione Modelo" options={carros || []} handleOptionChange={handleOptionChange} />
      <Select label="Ano" title="Selecione Ano" options={anos || []} handleOptionChange={handleOptionChange} />
      <RangeSlider />
      <Button variant="contained" color="secondary">
        <Link href={`/carros`}>
          <a>VER OFERTAS</a>
        </Link>
      </Button>
    </Container>
  )
}

export default SimpleSearch


const Container = styled.div`
  background: white;
  width: 280px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0 10px 0;

  .MuiButton-containedSecondary {
    background-color: var(--red);
  }
  .MuiButton-root {
    font-size: 1.4rem;
  }
`
