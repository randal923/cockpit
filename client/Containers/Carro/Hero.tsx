import styled from 'styled-components'
import config from '../../utils/config'
import { toMoney } from '../../utils/format'
import Link from 'next/link'

interface IProps {
  _id: string
  modelo: string
  preco: string
  img: string
  localizacao: string
  quilometragem: string
  cambio: string
  motor: string
  combustivel: string
}

export default function Hero(props: IProps) {

  return (
    <Link href={`/carro/${props.modelo}?id=${props._id}`}>
      <a>
        <Container>
          <Card>
            <TituloCarro>
              <img src={props.img ? `${config.api}/public/images/${props.img}` : '/default_vehicle_720.png'} title="car" alt="imagem_carro" />
              <h2>{props.modelo}</h2>
              <span>R$ {toMoney(parseInt(props.preco))}</span>
            </TituloCarro>

            <Location>
              <img src="/icons/location_icon.svg" title="location_icon" />
              <span>{props.localizacao}</span>
            </Location>

            <CarDetails>
              <div>
                <img src="/icons/street_icon.svg" title="street_icon" />
                <span>{props.quilometragem} KM</span>
              </div>
              <div>
                <img src="/icons/gearbox_icon.svg" title="gearbox_icon" />
                <span>{props.cambio}</span>
              </div>
              <div>
                <img src="/icons/engine_icon.svg" title="engine_icon" />
                <span>{props.motor}</span>
              </div>
              <div>
                <img src="/icons/gas_icon.svg" title="gas_icon" />
                <span>{props.combustivel}</span>
              </div>
            </CarDetails>
          </Card>
        </Container>
      </a>
    </Link>
  )
}

const Container = styled.div`
  margin: 10px;
  span {
    font-size: 1.1rem;
    color: var(--text-grey);
    font-weight: 300;
  }
`


const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  height: 350px;
  width: 270px;
  box-shadow: var(--box-shadow);

  img {
    height: 175px;
    width: 270px;
  }
`

const TituloCarro = styled.div`
  h2 {
    color: var(--text-dark-grey);
  }

  h2 {
    font-size: 1.6rem;
    margin: 10px 0 5px 9px;
    font-weight: 400;
  }

  span {
    margin-left: 10px;
    font-weight: 400;
    font-size: 1.8rem;
  }
`

const Location = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;

  img {
    height: 16px;
    width: 16px;
  }

  span {
    font-size: 1.2rem;
    font-weight: 400;
  }
`

const CarDetails = styled.div`
  display: grid;
  grid-auto-flow: row;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px;

  img {
    height: 24px;
    width: 24px;
    margin: 2px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px;
    width: 100%;
    height: 100%;
    border-top: 1px solid var(--border-color);
  }
  div:not(:last-child) {
    border-right: 1px solid var(--border-color);
  }
`