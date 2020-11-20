import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../../redux/auth'

//Icons
import { AiOutlineUser, AiOutlineUserAdd, AiOutlineCar} from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiLogoutBoxLine } from "react-icons/ri"
import DropDownMenu from '../../../../Components/DropDownMenu'

interface Props {
  usuario: any
}

const UserMenu = (props: Props) => {
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(logOut())
    handleUserOnClick()
  }

  const handleUserOnClick = (): void => {
    setOpenUserMenu(!openUserMenu)
  }

  return (
    <>
      {props.usuario ? (
        <MenuDropDown>
          <User onClick={handleUserOnClick}>
            <AiOutlineUser />
            <MdKeyboardArrowDown />
          </User>
          <DropDownMenu openMenu={openUserMenu} onUserClick={handleUserOnClick}>
            <ul>
              <li>
                <Link href="/carro/criar-anuncio">
                    <div>
                      <AiOutlineCar />
                      <a onClick={handleUserOnClick}>Criar Anúncio</a>
                    </div>
                </Link>
              </li>
              <li>
                <Link href="/usuario/conta">
                    <div>
                      <AiOutlineUser />
                      <a onClick={handleUserOnClick}>Editar Perfil</a>
                    </div>
                </Link>
              </li>
              <li onClick={handleUserOnClick}>
                <div onClick={signOut} className="sair">
                  <RiLogoutBoxLine />
                  Sair
                </div>
              </li>
            </ul>
          </DropDownMenu>
        </MenuDropDown>
      ) : (
        <Entrar>
          <h3 onClick={handleUserOnClick}>Entrar</h3>
          <DropDownMenu openMenu={openUserMenu} onUserClick={handleUserOnClick}>
            <ul>
              <li>
                <Link href="/login">
                  <div>
                    <AiOutlineUser />
                    <a onClick={handleUserOnClick}>Login</a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/usuario/registrar">
                  <div>
                    <AiOutlineUserAdd />
                    <a onClick={handleUserOnClick}>Registrar</a>
                  </div>
                </Link>
              </li>
            </ul>
          </DropDownMenu>
        </Entrar>
      )}
    </>
  )
}

export default UserMenu


const MenuDropDown = styled.div`
  margin-right: 15px;
  position: relative;
  z-index: 5;
  justify-self: flex-end;
  width: 20px;

  #dropdown {
    position: absolute;
    top: 45px;
    left: -120px;

    .sair:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

const User = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  :hover {
    cursor: pointer;
  }

  svg {
    margin: 0 !important;
    color: var(--grey);
    height: 20px;
    width: 20px;
    :last-child {
      position: absolute;
      top: 3px;
      left: 13px;
    }

    :hover,
    :active {
      color: var(--red);
    }

  }
`

const Entrar = styled.div`
 justify-self: flex-end;
 width: 20px;
 margin-right: 25px;
 position: relative;

  h3 {
    font-size: 1.3rem;
    font-weight: 400;
    :hover  {
      cursor: pointer;
      color: var(--red);
    }
  }

 #dropdown {
  position: absolute;
  top: 55px;
  left: -110px;
 }

`