import Head from './Head'
import Body from './Body'
import Footer from './Footer'
import React from 'react'
import Header from './Header'

// Styles
import GlobalStyle from '../../global/styles'

interface IProps {
  children?: React.ReactNode
}

const Layout = (props: IProps) => (
  <>
    <Head />
    <Header />
    <Body children={props.children} />
    <Footer />
    <GlobalStyle />
  </>
)

export default Layout
