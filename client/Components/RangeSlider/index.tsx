import styled from 'styled-components'
import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { toMoney } from '../../utils/format';

interface IProps {
  handlePriceSlider: (newValue: number[], tipo: string) => void
}
const RangeSlider = (props: IProps) => {
  const [value, setValue] = useState<number[]>([0, 500000])


  const handleChange = (event: any, newValue: number[]) => {
    props.handlePriceSlider(newValue, 'preco')
    setValue(newValue as number[])
  }

  return (
    <Container>
      <Typography id="range-slider" gutterBottom>
        <span>Price</span>
        <br />
        <span>
          R$ {toMoney(value[0])} - {toMoney(value[1])}
        </span>
      </Typography>
      <Slider value={value} onChange={handleChange} aria-labelledby="range-slider" min={0} max={1000000} />
    </Container>
  )
}

export default RangeSlider

const Container = styled.div`
  .MuiSlider-root {
    padding: 20px 0;
  }
  
  .MuiSlider-thumb.MuiSlider-active {
    box-shadow: 0px 0px 0px 14px rgba(237, 28, 36, 0.16);
  }

  #range-slider {
    width: 230px;
    color: var(--text-grey);
  }

  .MuiTypography-root {
    span:first-child {
      font-size: 1.6rem;
    }
    span:last-child {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }

  span {
    .MuiSlider-rail {
      background: #f0f0f0;
      height: 4px;
    }
    .MuiSlider-track {
      background: var(--red);
      height: 4px;
    }

    .MuiSlider-thumb {
      background: white;
      border: 1px solid var(--red);
      width: 16px;
      height: 16px;
      margin-top: -6px;
    }
  }
`

