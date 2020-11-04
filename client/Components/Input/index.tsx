import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

interface Props {
  label: string
  defaultValue: string
  helperText?: string
  type: string
  onChange?: (e: any) => void
  disabled?: boolean
}
export default function Input(props: Props) {
  return (
    <Container>
      <div className="input">
        <TextField
          disabled={props.disabled}
          id="standard-helperText"
          label={props.label}
          defaultValue={props.defaultValue}
          helperText={props.helperText}
          type={props.type}
          onChange={props.onChange}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .input {
    margin: 10px 0;
  }
  .MuiTextField-root {
    width: 100%;
  }

  .MuiFormLabel-root {
    font-size: 1.7rem;
  }

  .MuiInputBase-input {
    font-size: 1.5rem;
  }
`