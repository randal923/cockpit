import styled, { css } from 'styled-components'
import { BsCheck } from 'react-icons/bs'
import { useState } from 'react'
import breakPoint from '../../../utils/mediaQuery'

const About = (props: any) => {
      return (
        <Sobre>
          <ul>
            <li>
              <span>Marca:</span>
              <span>{props.carro.marca.nome}</span>
            </li>
            <li>
              <span>Motor:</span>
              <span>{props.carro.motor}</span>
            </li>
            <li>
              <span>Cambio:</span>
              <span>{props.carro.cambio}</span>
            </li>
            <li>
              <span>Alimentado:</span>
              <span>{props.carro.sobrealimentado}</span>
            </li>
            <li>
              <span>Suspenção:</span>
              <span>{props.carro.suspencao}</span>
            </li>
            <li>
              <span>Estilo:</span>
              <span>{props.carro.estilo}</span>
            </li>
            <li>
              <span>Carroceria:</span>
              <span>{props.carro.carroceria}</span>
            </li>
            <li>
              <span>Cor:</span>
              <span>{props.carro.cor}</span>
            </li>
            <li>
              <span>Cilindrada:</span>
              <span>{props.carro.cilindrada}</span>
            </li>
            <li>
              <span>Ano:</span>
              <span>{props.carro.ano}</span>
            </li>
            <li>
              <span>Combustível:</span>
              <span>{props.carro.combustivel}</span>
            </li>
            <li>
              <span>Quilometragem:</span>
              <span>{props.carro.quilometragem}</span>
            </li>
          </ul>
        </Sobre>
      )
}

export default About

const Sobre = styled.div`
  background: #20262f;
  width: 280px;

  @media (min-width: ${breakPoint.mediumMobile}) {
    width: 330px;
  }

  @media (min-width: ${breakPoint.largeMobile}) {
    width: 380px;
  }

  @media (min-width: ${breakPoint.laptop}) {
    align-self: start;
    margin: 27px 15px 0 0;
  }

  ul {
    margin: 0 10px;
    font-size: 1.4rem;
    padding: 0;
    text-transform: uppercase;
    margin: 15px 0 28px 0;

    li {
      color: white;
      border-bottom: 1px solid white;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      padding: 10px;
    }
  }
`
