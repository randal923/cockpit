import styled, { css, keyframes } from 'styled-components'

interface IProps {
  openModal?: boolean
  handleModalClick?: () => void
}

const HeaderMenu = (props: IProps) => {

  return (
    <>
      <HeaderMenuContainer openModal={props.openModal}>
        
      </HeaderMenuContainer>
      <BackDrop openModal={props.openModal} onClick={() => props.handleModalClick()}></BackDrop>
    </>
  )
}

export default HeaderMenu

const slideIn = keyframes`
	0% {transform: translateX(-200px);}
	100% {transform: translateX(0px);}
`


const HeaderMenuContainer = styled.nav<IProps>`
  width: 200px;
  background: white;
  height: 100%;
  animation: ${slideIn} 0.2s linear;
  z-index: 6;
  display: none;
  position: absolute;
  top: 0;
  left: 0;

  ${(props) => {
    if (props.openModal === true) {
      return css`
        display: block;
      `
    }
  }}

`

const BackDrop = styled.div<IProps>`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  display: none;
  cursor: pointer;

  ${(props) => {
    if (props.openModal === true) {
      return css`
        display: block;
      `
    }
  }}
`

