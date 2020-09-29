import React from 'react'
import Layout from '../Containers/Layout'
import {Provider} from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import {store, persistor} from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '../Components/Loading/index';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)