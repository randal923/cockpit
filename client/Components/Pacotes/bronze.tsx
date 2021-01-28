import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

// Components
import Card from '../Card'

// Icons
import { AiOutlineCheck } from "react-icons/ai"

const Bronze = () => {

  return (
    <Card width={200}>
      <Pacote>
        <h1>Bronze</h1>
        <div>
          <span>R$</span>
          <h4>90,00</h4>
        </div>
      </Pacote>
      <Link href={`/comprar`}>
        <Button variant="contained" color="secondary">
          <a>COMPRAR</a>
        </Button>
      </Link>
      <UL>
        <li>
          <AiOutlineCheck />
          <h3>6 Fotos</h3>
        </li>
        <li>
          <AiOutlineCheck />
          <h3>2 anúncios simultâneos</h3>
        </li>
      </UL>
    </Card>
  )
}

export default Bronze


const Pacote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    background: linear-gradient(to bottom, #CD7F32 0%, #BE7023 100%);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
  }

  div {
    display: flex;
    align-items: center;
    h4 {
      font-size: 2rem;
      margin: 0;
    }
    span {
      font-size: 1.3rem;
    }
  }
`

const UL = styled.ul`
  margin: 15px 0;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    margin: 5px;
    h3 {
      font-size: 1.4rem;
      margin: 0;
    }
    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
`