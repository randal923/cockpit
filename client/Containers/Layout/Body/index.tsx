import React from 'react'
import styled from 'styled-components'

interface IBody {
  children: React.ReactNode
}

const Body = (props: IBody) => <BodyContainer>{props.children}</BodyContainer>

export default Body

const BodyContainer = styled.main``
