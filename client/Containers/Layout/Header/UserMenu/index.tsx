import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../../redux/auth'

//Icons
import { AiOutlineUser } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiLogoutBoxLine } from "react-icons/ri"

interface Props {
  usuario: any
}

const UserMenu = (props: Props) => {
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const dispatch = useDispatch()
  const wrapperRef = useRef(null);

  useEffect(() => {
    const dropDown = document.getElementById('dropdown')
    if (openUserMenu) {
      dropDown.style.opacity = '0.95'
      dropDown.style.visibility = 'visible'

    } else {
      dropDown.style.opacity = '0'
      dropDown.style.visibility = 'hidden'
    }

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && openUserMenu) {
        handleUserOnClick()
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [wrapperRef, openUserMenu])


  const handleUserOnClick = (): void => {
    setOpenUserMenu(!openUserMenu)
  }

  const signOut = () => {
    dispatch(logOut())
    handleUserOnClick()
  }

  return (
    <>
      {props.usuario ? (
        <MenuDropDown>
          <User onClick={handleUserOnClick} ref={wrapperRef}>
            <AiOutlineUser />
            <MdKeyboardArrowDown />
          </User>
          <DropDown id="dropdown">
            <ul onClick={handleUserOnClick}>
              <li>
                <Link href="/usuario/conta">
                  <div>
                    <AiOutlineUser />
                    <a>
                      Editar Perfil
                    </a>
                  </div>
                </Link>
              </li>
              <li onClick={signOut}>
                <div>
                  <RiLogoutBoxLine />
                  Sair
                </div>
              </li>
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
  z-index: 5;
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
  background: white;
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
    margin: 0;
    padding: 0;

    li {
      padding: 15px;
      width: 100%;
      color: black;
      font-size: 1.3rem;
      :not(:last-child) {
        border-bottom: var(--border);
      }

      :hover {
        cursor: pointer;
        text-decoration: underline;
      }

      div {
        display: flex;
        align-items: center;

        a {
          font-size: 1.3rem;
          color: black;
          width: 100%;
        }

        svg {
          margin-right: 5px;
          min-width: 18px;
          min-height: 18px;
        }
      }
    }

    
  }
`
