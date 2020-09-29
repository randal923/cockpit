import styled from 'styled-components'
import { getCarro } from '../../redux/carros';
import { useSelector } from 'react-redux';
export default function CarroPage() {
  const carro = useSelector(state => state.carros.carro)
  return (
      <Container>
        <h2></h2>
      </Container>
  )
}

const Container = styled.div``