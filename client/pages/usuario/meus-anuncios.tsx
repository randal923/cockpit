import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Hero from '../../Containers/Carro/Hero'
import Loading from '../../Components/Loading'

const meusAnuncios = () => {
  const [isLoading, setIsLoading] = useState(true)
  const usuario = useSelector((state) => state.auth?.usuario)


  useEffect(() => {
    if (usuario) {
      setIsLoading(false)
    }
  }, [usuario])

  function renderSearchedCarros() {
    return usuario.carros.map((carro) => {
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

export default meusAnuncios

const Container = styled.div``