import react from 'react'
import styled from 'styled-components'

const Loading = () => {
  return (
    <Container>
      <Loader></Loader>
    </Container>
  )
}

export default Loading

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loader = styled.div`
  border: 2px solid #3dd1cd;
  border-top: 2px solid var(--red);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 1.5s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
