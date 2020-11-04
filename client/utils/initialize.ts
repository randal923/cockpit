import Router from 'next/router'
import { reauthenticate } from '../redux/auth'
import { getCookie } from './cookie'

export const initialize = (ctx) => {
  if(ctx.isServer){
    ctx.store.dispatch(reauthenticate(getCookie("token", ctx.req)))
  } else if(ctx.store){
    const token = ctx.store.getState().auth.usuario.token
    if(!token) ctx.res.writeHead(302, {location: '/'})
  }
}