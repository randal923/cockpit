import styled from 'styled-components'
import {useState, useEffect} from 'react'
import Loading from '../Components/Loading'
import { useSelector } from 'react-redux';

const Carros = () => {
  const [isLoading, setIsLoading] = useState(true)

 


  return (
    <Container>
      {isLoading ? <Loading /> : <h1>Carros</h1>}
    </Container>
  )
}

export default Carros

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
