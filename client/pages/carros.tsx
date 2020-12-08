import styled from 'styled-components'
import {useState, useEffect} from 'react'
import Loading from '../Components/Loading'
import { useSelector } from 'react-redux'
import Hero from '../Containers/Carro/Hero'

const Carros = () => {
  const [isLoading, setIsLoading] = useState(true)
  const searchedCarros = useSelector((state) => state.carros?.searchedCarros)

  useEffect(() => {
    if (searchedCarros?.length > 0) {
      setIsLoading(false)
    }
  }, [searchedCarros])

  function renderSearchedCarros() {
    return searchedCarros.map((carro) => {
      return (
          <Container key={carro._id}>
            <Hero
              _id={carro._id}
              modelo={carro.modelo}
              preco={carro.preco}
              img={carro.fotos[0]}
              localizacao={carro.localizacao}
              quilometragem={carro.quilometragem}
              cambio={carro.cambio}
              motor={carro.motor}
              combustivel={carro.combustivel}
            />
          </Container>
      )
    })
  }

  return <Container>{isLoading ? <Loading /> : renderSearchedCarros()}</Container>
}

export default Carros

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
`