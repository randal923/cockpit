import React from 'react'
import Layout from '../Containers/Layout'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import {store, persistor} from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '../Components/Loading/index'
import Snack from '../Components/Snack'
import { removeError } from '../redux/error'
import { showSnack } from '../redux/snack'

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.error?.error)
  const snackStatus = useSelector(state => state.snack?.snack)

  if(error) {
    dispatch(showSnack('error', error.response?.data.error))
    dispatch(removeError())
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
      {snackStatus && <Snack />}
    </>
  )
}

MyApp.getInitialProps = async ({Component, ctx}) => {

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  }
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)