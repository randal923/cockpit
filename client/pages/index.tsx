import SimpleSearch from '../Containers/SimpleSearch/index';
import styled from 'styled-components'

const Home = () => {
  return (
    <Container>
      <SimpleSearch />
    </Container>
  )
}

export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`