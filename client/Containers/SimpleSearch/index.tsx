import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Select from '../../Components/Select/index'
import RangeSlider from '../../Components/RangeSlider/index'
import { useSelector, useDispatch } from 'react-redux'
import { getCarros, searchCarros } from '../../redux/carros'
import {anos} from '../../utils/data'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import axios from 'axios'

interface IOptions {
  label: string
  value: string
}

const SimpleSearch = (): any => {
  const [search, setSearch] = useState({ preco: [0, 500000] })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCarros())
  }, [dispatch])


  const carros = useSelector((state) => state.carros.carros?.docs.map((carro) => {
    return {
      label: carro.modelo,
      value: carro.modelo
    }
    })
  )

  function handleOptionChange(e: any, tipo: string) {
    e.persist()
    setSearch((prevState) => ({ ...prevState, [tipo]: e.target.value }))
  }

  function handlePriceSlider(newValue: number[], tipo: string) {
    setSearch((prevState) => ({ ...prevState, [tipo]: newValue as number[] }))
  }

  function handleOnClick() {
    dispatch(searchCarros(search))
  }

  return (
    <Container>
      <Select
        label="Modelo"
        title="Selecione Modelo"
        options={carros || []}
        handleOptionChange={handleOptionChange}
        tipo="modelo"
      />
      <Select
        label="Ano"
        title="Selecione Ano"
        options={anos || []}
        handleOptionChange={handleOptionChange}
        tipo="ano"
      />
      <RangeSlider handlePriceSlider={handlePriceSlider} />
      <Button variant="contained" color="secondary" onClick={handleOnClick}>
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
