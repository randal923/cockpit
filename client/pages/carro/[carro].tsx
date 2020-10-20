import styled from 'styled-components'
import { getCarro } from '../../redux/carros'
import config from '../../utils/config'
import {toMoney} from '../../utils/format'
import breakPoint from '../../utils/mediaQuery'
import Galery from '../../Containers/Carro/Galery'
import Description from '../../Containers/Carro/Description'
import About from '../../Containers/Carro/Sobre'

export default function CarroPage({carro}) {
  const fotosArray = carro.payload.fotos.map((foto) => {
    return {
        original: `${config.baseImg}${foto}`,
        thumbnail: `${config.baseImg}${foto}`
      }
  })

  return (
    <Container>
      <Card>
        <Header>
          <h1>{carro.payload.modelo}</h1>
          <h2>R$ {toMoney(carro.payload.preco)}</h2>
        </Header>
        <Galery photos={fotosArray} />
        <Description carro={carro.payload}/>
      </Card>
      <About carro={carro.payload}/>
    </Container>
  )
}

CarroPage.getInitialProps = async (ctx) => {
  const getcarro = await ctx.store.dispatch(getCarro(ctx.query.id))
  return { carro: getcarro }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakPoint.laptop}) {
    flex-direction: row;
  }
`

const Card = styled.div`
  margin: 20px;
  width: 280px;

  @media (min-width: ${breakPoint.mediumMobile}) {
    width: 330px;
  }
  @media (min-width: ${breakPoint.largeMobile}) {
    width: 380px;
  }
  @media (min-width: ${breakPoint.tablet}) {
    width: 720px;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;

  h1 {
    font-size: 2.3rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0;
  }

  h2 {
    font-size: 2.2rem;
    color: var(--red);
    font-weight: 500;
    margin: 0;
  }
`