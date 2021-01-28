import styled from 'styled-components'

// Components
import { Bronze } from '../Components/Pacotes'

const Pacotes = () => {
  return (
   <Container>
      <Bronze />
   </Container>
  )
}

export default Pacotes

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`