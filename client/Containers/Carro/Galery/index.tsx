import styled, {css, keyframes} from 'styled-components'
import config from '../../../utils/config'
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import breakPoint from '../../../utils/mediaQuery';

interface IProps {
  photos: [{
    original: string,
    thumbnail: string
  }]
}

interface Photo {
  original: string
  thumbnail: string
}

const Galery = (props: IProps) => {
  const [counter, setCounter] = useState(1)

  const handleOnClick = (photo: Photo, index: number) => {
    const banner = document.querySelector<HTMLElement>('.div__banner')
    const slideRate = index * 100
    banner.style.transform = `translateX(-${slideRate}%)`
  }

  const generateDefaultThumbNail = () => {
    const images = []

    for (let i = 0; i < 5; i++) {
      const image = <img src="/default_vehicle_60x120.png" alt="default_vehicle" key={i}/>
      images.push(image)
    }

    return images
  }

  const generateDefaultBanner = () => {
    return <img src="/default_vehicle_720.png" alt="default_vehicle" />
  }
  
  return (
    <Container>
      <Banner>
        <div className="div__banner">
          {props.photos.length < 1 && generateDefaultBanner()}
          {props.photos.map((photo, index) => (
            <img src={photo.original} key={photo.original} alt="cokpit-garage-banner" />
          ))}
        </div>
      </Banner>
      <Thumbnail>
        <ul className="ul">
          {props.photos.length < 1 && generateDefaultThumbNail()}
          {props.photos.map((photo, index) => (
            <li onClick={() => handleOnClick(photo, index)} key={photo.original}>
              <span>
                <img src={photo.thumbnail} />
              </span>
            </li>
          ))}
        </ul>
        <IoIosArrowBack className="arrows arrows__right" />
        <IoIosArrowForward className="arrows arrows__left" />
      </Thumbnail>
    </Container>
  )
}

export default Galery

const Container = styled.div`
  .arrows {
    position: absolute;
    z-index: 2;
    transition: opacity 0.8s;
    height: 35px;
    width: 35px;

    &__right {
      bottom: 30%;
      left: -25px;
    }
    &__left {
      bottom: 30%;
      right: -25px;
    }

    :hover {
      cursor: pointer;
      color: white;
    }
  }
`

const Banner = styled.div`
  width: 100%;
  overflow: hidden;
  div {
    display: flex;
    transition: all 0.4s ease-in;
    width: 100%;
  }
  img {
    height: 200px;
    width: 100%;
    height: auto;
  }
`
const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  ul:hover ~ .arrows {
    opacity: 1;
  }

  ul {
    padding: 0;
    display: flex;
    li {
      height: 100%;
      position: relative;

      :first-child {
        margin: 5px 0 5px 0;
      }
      :not(:first-child) {
        margin: 5px 0 5px 5px;
      }
      :hover {
        cursor: pointer;
        span {
          ::after {
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }
      span {
        img {
          height: 60px;
          width: 120px;
        }
        ::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.6);
          transition: all 0.3s;
        }
      }
    }
  }
`