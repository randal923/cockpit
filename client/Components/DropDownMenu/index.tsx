import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'

const DropDownMenu = ({children, openMenu, onUserClick}) => {
  const wrapperRef = useRef(null);

  
  useEffect(() => {
    const dropDown = document.getElementById('dropdown')
    if (openMenu && dropDown) {
      dropDown.style.opacity = '0.95'
      dropDown.style.visibility = 'visible'

    } else if(dropDown) {
      dropDown.style.opacity = '0'
      dropDown.style.visibility = 'hidden'
    }

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && openMenu) {
        onUserClick()
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [wrapperRef, openMenu])


  return (
     <DropDown id="dropdown" ref={wrapperRef}>
      {children}
     </DropDown>
  )
}

export default DropDownMenu

const DropDown = styled.div`
  min-width: 150px;
  background: white;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: var(--box-shadow);

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    li {
      width: 100%;
      color: black;
      font-size: 1.3rem;
      padding: 15px;

      :not(:last-child) {
        border-bottom: var(--border);
      }

        div {
          display: flex;
          align-items: center;

          svg {
            margin: 0 5px 0 0;
            min-width: 25px;
            min-height: 20px;
          }
        }

      a {
        font-size: 1.3rem;
        color: black;

        :hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  } 
`