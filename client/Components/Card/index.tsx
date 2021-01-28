import styled from 'styled-components'

const Card = ({children, width}: {children: any, width: number}) => {
  return (
    <Container width={width}>
      {children}
    </Container>
  )
}

export default Card

const Container = styled.div<{width: number}>`
  background: white;
  width: ${props => `${props.width}px`};
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
`