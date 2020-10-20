import styled, { css } from 'styled-components'
import { BsCheck } from 'react-icons/bs'
import { useState } from 'react'
import breakPoint from '../../../utils/mediaQuery'

interface IProps {
  selected: {
    firstH2: boolean
    secondH2: boolean
    thirdH2: boolean
  }
}

const Description = (props: any) => {
  const [firstH2, setFirstH2] = useState(true)
  const [secondH2, setsecondH2] = useState(false)
  const [thirdH2, setThirdH2] = useState(false)

  const handleClickFirstH2 = () => {
    setFirstH2(true)
    setsecondH2(false)
    setThirdH2(false)
  }

  const handleClickSecondH2 = () => {
    setFirstH2(false)
    setsecondH2(true)
    setThirdH2(false)
  }

  const handleClickThirdH2 = () => {
    setFirstH2(false)
    setsecondH2(false)
    setThirdH2(true)
  }

  const getCarItems = () => {
    const itemsArray = []
    for (const [key, value] of Object.entries(props.carro.items)) {
      if(value === true) {
        itemsArray.push(key)
      }
    }
    return itemsArray
  }
  return (
    <Container
      selected={{
        firstH2,
        secondH2,
        thirdH2
      }}
    >
      <div className="descriptionList">
        <ul>
          <li onClick={handleClickFirstH2}>Items</li>
          <li onClick={handleClickSecondH2}>Descrição</li>
          <li onClick={handleClickThirdH2}>Contato</li>
        </ul>
      </div>

      <Features>
        {firstH2 && (
          <Items>
            <ul>
              {getCarItems().map((item) => (
                <li key={item}>
                  <BsCheck size={20} />
                  <h2>{item}</h2>
                </li>
              ))}
            </ul>
          </Items>
        )}
        {secondH2 && (
          <Descricao>
            <h2>{props.carro.descricao}</h2>
          </Descricao>
        )}
        {thirdH2 && (
          <Contato>
            <h2>Contato do usuario</h2>
          </Contato>
        )}
      </Features>
    </Container>
  )
}

export default Description

const Container = styled.div<IProps>`
  margin: 10px;
  width: 100%;

  .descriptionList {
    height: 50px;
    background: var(--light-grey);

    ul {
      display: flex;
      height: 100%;
      align-items: center;
      text-align: center;
      padding: 0;

      li {
        color: black;
        font-weight: 600;
        height: 100%;
        font-size: 1.4rem;
        text-transform: uppercase;
        padding: 17px 10px;
        width: 100px;

        :hover {
          cursor: pointer;
          color: var(--red);
        }
      }

      ${(props) => {
        if (props.selected.firstH2 === true) {
          return css`
            li:first-child {
              background: var(--select-background);
              color: white;
              border-bottom: solid 3px var(--red);
            }
          `
        } else if (props.selected.secondH2 === true) {
          return css`
            li:not(:first-child):not(:last-child) {
              background: var(--select-background);
              color: white;
              border-bottom: solid 3px var(--red);
            }
          `
        } else if (props.selected.thirdH2 === true) {
          return css`
            li:last-child {
              background: var(--select-background);
              color: white;
              border-bottom: solid 3px var(--red);
            }
          `
        }
      }}
    }
  }
`
const Features = styled.div`
  min-height: 200px;
`

const Items = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    align-content: flex-start;

    li {
      display: flex;
      font-size: 1.5rem;
      line-height: 1.5;
      height: 100%;
      align-items: center;
      justify-content: flex-start;
      width: 45%;
      border-bottom: dotted 1px var(--medium-grey);
      margin: 5px;
      padding: 10px;

      @media(max-width: ${breakPoint.largeMobile}) {
        width: 100%;
      }

      h2 {
        color: black;
        margin: 0;
      }

      svg {
        color: green;
        margin-right: 5px;
      }
    }
  }
`

const Descricao = styled.div``
const Contato = styled.div``
