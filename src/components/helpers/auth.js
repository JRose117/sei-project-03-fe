import axios from 'axios'
import { Buffer } from 'buffer'
// might need to run npm i buffer -> buffer decodes an encoded string 

// setting token

export const setToken = (token) => {
  window.localStorage.setItem('moviematch', token)
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

// getting token

export const getToken = () => {
  return window.localStorage.getItem('moviematch')
}

// verify token by checking it exists and is JWT, aiming to return payload as object

export const getPayload = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !==3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

// check that expiry date is in the future

export const userIsAuthenticated = () => {
  const payload = getPayload()
  console.log('payload->',payload)
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}



