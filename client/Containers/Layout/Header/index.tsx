import styled, { css } from 'styled-components'
import HeaderMenu from './HeaderMenu'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiShoppingCart } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineUser } from "react-icons/ai"
import { MdKeyboardArrowDown } from "react-icons/md"
import UserMenu from './UserMenu'

interface Props {
  openModal: boolean
  handleModalClick?: () => void
}

const Header = () => {
  const [openModal, setOpenModal] = useState(false)

  const usuario = useSelector((state) => state.usuario.usuario)

  function handleModalClick() {
    if (openModal === true) {
      setOpenModal(false)
    } else {
      setOpenModal(true)
    }
  }

  return (
    <>
      <HeaderContainer>
        <HamburgerSearch>
          <Hamburger openModal={openModal} onClick={() => handleModalClick()} />
        </HamburgerSearch>
        <Logo>
          <Link href="/">
            <a>
              <img src="/cockpit_logo.svg" title="cockpit_logo" />
            </a>
          </Link>
        </Logo>
        <UserMenu usuario={usuario} />
      </HeaderContainer>
      <HeaderMenu openModal={openModal} handleModalClick={handleModalClick} />
    </>
  )
}

export default Header

const HeaderContainer = styled.header`
  height: 70px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  background: white;
  box-shadow: var(--box-shadow);

  a {
    text-decoration: none;
    color: black;
  }

  svg {
    margin-right: 10px;
    justify-self: end;
  }

  .login {
    font-size: 1.3rem;
    justify-self: end;
    margin-right: 10px;
    text-transform: uppercase;

    :hover  {
      color: var(--red);
    }
  }
`

const HamburgerSearch = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  svg {
    margin-left: 4px;
  }
`

const Logo = styled.div`
  margin: 10px;
  justify-self: center;

  img {
    height: 50px;
  }

`


const Hamburger = styled.div<Props>`
  width: 20px;
  height: 2px;
  background: var(--grey);

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background: var(--grey);
    transition: transform 0.4s ease-in-out;
  }

  ::before {
    transform: translateY(-5px);
  }

  ::after {
    transform: translateY(5px);
  }

  ${(props) => {
    if (props.openModal === true) {
      return css`
        background: transparent;
        ::before {
          transform: rotate(45deg);
        }

        ::after {
          transform: rotate(-45deg);
        }
      `
    }
  }}
`