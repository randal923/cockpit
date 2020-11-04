import React, {useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { removeSnack } from '../../redux/snack'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))


const Snack = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const snack = useSelector(state => state.snack?.snack)

  const handleClose = (): void => {
    setOpen(false)
    dispatch(removeSnack())
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.type}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  )
}


export default Snack