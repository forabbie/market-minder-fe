import { utf8_to_b64, b64_to_utf8 } from '../includes/helper'

class StorageService {
  setCookie(key, str, exdays) {
    const value = JSON.stringify(str)
    const encode = utf8_to_b64(value)
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = key + '=' + encode + ';' + expires + ';path=/;samesite'
  }

  getCookie(key) {
    let name = key + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        const decode = b64_to_utf8(c.substring(name.length, c.length))
        return JSON.parse(decode)
      }
    }
    return ''
  }

  deleteCookie(key) {
    const d = new Date()
    let expires = 'expires=' + d.toUTCString()
    document.cookie = key + '=' + ';Path=/' + ';' + expires
  }

  setLocalStorage(key, str) {
    const value = JSON.stringify(str)
    const encode = utf8_to_b64(value)
    localStorage.setItem(key, encode)
  }

  getLocalStorage(key) {
    if (localStorage.getItem(key)) {
      const decode = b64_to_utf8(localStorage.getItem(key)) || ''
      return JSON.parse(decode)
    }
    return ''
  }

  deleteLocalStorage(key) {
    localStorage.removeItem(key)
  }
}

export default new StorageService()
