import StorageService from '@/services/storage.service'

export function formatDate(dateStr) {
  const dateObj = new Date(dateStr)
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function utf8_to_b64(str) {
  return btoa(unescape(encodeURIComponent(str)))
}

export function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str)))
}

export function getUserID() {
  const token = StorageService.getCookie('token').access_token || null
  const userID = token ? JSON.parse(token) : { sub: null }
  return userID
}
