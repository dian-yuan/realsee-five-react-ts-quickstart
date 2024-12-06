/*
 * @Author: yuanweihao
 * @Date: 2023-11-28 08:49:28
 * @LastEditTime: 2024-08-06 11:30:09
 * @LastEditors: yuanweihao
 * @FilePath: \ubase\src\utils\auth.js
 * @Description: Do not edit
 */
import Cookies from 'js-cookie'

const TokenKey = 'FF-Token'
const orgKey = 'isOrg'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setIsOrg(flag){
  return Cookies.set(orgKey,flag)
}


export function getIsOrg(){
  return Cookies.get(orgKey)
}

export function removeIsOrg() {
  return Cookies.remove(orgKey)
}
