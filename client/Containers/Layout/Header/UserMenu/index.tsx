import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../../redux/auth'

interface Props {
  usuario: any
}

const UserMenu = (props: Props) => {
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const dispatch = useDispatch()

  const handleUserOnClick = (): void => {
    const dropDown = document.getElementById('dropdown')

    if (openUserMenu === false) {
      setOpenUserMenu(true)
      dropDown.style.opacity = '0.95'
    } else {
      setOpenUserMenu(false)
      dropDown.style.opacity = '0'
    }
  }

  const signOut = () => {
    dispatch(logOut())
    handleUserOnClick()
  }

  return (
    <>
      {props.usuario ? (
        <MenuDropDown>
          <User onClick={handleUserOnClick}>
            <AiOutlineUser />
            <MdKeyboardArrowDown />
          </User>
          <DropDown id="dropdown">
            <ul>
              <li>
                <Link href="/usuario/dados">
                  <a>{props.usuario.nome}</a>
                </Link>
              </li>
              <li onClick={signOut}>Sair</li>
            </ul>
          </DropDown>
        </MenuDropDown>
      ) : (
        <Link href="/login">
          <a className="login">Login</a>
        </Link>
      )}
    </>
  )
}

export default UserMenu

const MenuDropDown = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  position: relative;
`

const User = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  :hover {
    cursor: pointer;
  }

  svg {
    margin: 0;
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

const DropDown = styled.div`
  background: var(--grey);
  position: absolute;
  width: 150px;
  top: 222%;
  right: -10px;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: var(--box-shadow);
  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    margin: 0;
    padding: 0;

    li {
      padding: 5px;
      width: 100%;
      color: white;
      font-size: 1.3rem;
      :not(:last-child) {
        border-bottom: var(--border);
      }

      :hover {
        background: var(--dark-grey);
        cursor: pointer;
      }

      a {
        font-size: 1.3rem;
        color: white;
        width: 100%;
        display: block;
      }
    }
  }
`
