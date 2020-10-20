import cookie from 'js-cookie'

export const setCookie = (key: string, value: any) => {
  if (process.browser) cookie.set(key, value, { expires: 1, path: '/' })
}

export const removeCookie = (key: string) => {
  if (process.browser) cookie.remove(key, { expires: 1 })
}

export const getCookie = (key: string, req) => {
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

const getCookieFromBrowser = (key: string) => cookie.get(key)

const getCookieFromServer = (key: string, req) => {
  if (!req.headers.cookie) return undefined
  const _cookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`))
  return _cookie ? _cookie.split('=')[1] : undefined
}
