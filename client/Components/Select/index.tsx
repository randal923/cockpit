import styled from 'styled-components'
interface IOptions {
  label: string
  value: string
}

interface IProps {
  label: string
  title: string
  options: IOptions[]
  tipo: string
  handleOptionChange: (e: any, tipo: string) => void
}

const Select = (props: IProps) => {
  return (
    <Container>
      <select defaultValue={'DEFAULT'} onChange={(event: any) => props.handleOptionChange(event, props.tipo)}>
        <option value="DEFAULT">
          {props.title}
        </option>
        {props.options?.map((option) => {
          return (
            <option key={option.label} value={option.value}>
              {option.value}
            </option>
          )
        })}
      </select>
    </Container>
  )
}

export default Select

const Container = styled.div`
  select {
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    width: 230px;
    margin: 5px;
    height: 35px;
    outline-color: var(--red);

    :focus,
    ::selection {
      border: 1px solid var(--red);
    }
  }
`




/*
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import styled from 'styled-components'

interface IOptions {
  label: string
  value: string
}

interface IProps {
  label: string
  title: string
  options: IOptions[]
  handleOptionChange: (event: any, value: string | IOptions) => void
}

const Select = (props: IProps) => {
  return (
    <Container>
      <h2>{props.title}</h2>
      <Autocomplete
        style={{
          width: 230,
          background: 'white',
          marginBottom: '10px'
        }}
        options={props.options as IOptions[]}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(option) => <>{option.label}</>}
        onChange={(event, value) => props.handleOptionChange(event, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password' // disable autocomplete and autofill from browser
            }}
          />
        )}
      />
    </Container>
  )
}

export default Select

const Container = styled.div`
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--red);
  }

  .Mui-focused {
    color: var(--red) !important;
  }
`
*/