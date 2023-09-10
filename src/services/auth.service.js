import api from './api.service'
import storageService from './storage.service'

class AuthService {
  signin(user) {
    return api
      .post('auth/signin', {
        user: {
          email: user.email,
          password: user.password
        }
      })
      .then((response) => {
        if (response.data.token !== 'not found') {
          storageService.setCookie('token', response.data.token, 14)
          this.currentUser(response.data.token)
        }
        return response.data
      })
  }
  signup(user) {
    return api
      .post('auth/signup', {
        user: {
          first_name: user.fname,
          last_name: user.lname,
          email: user.email,
          password: user.password,
          password_confirmation: user.confirm_password
        }
      })
      .then((response) => {
        if (response.data.token) {
          storageService.setCookie('token', response.data.token, 14)
          this.currentUser(response.data.token)
        }
        return response.data
      })
  }
  signout() {
    return api.post('auth/signout').then((response) => {
      if (response.data) {
        storageService.deleteCookie('token')
        storageService.deleteCookie('user')
        storageService.deleteLocalStorage('auth')
      }
      return response.data
    })
  }
  currentUser(token) {
    return api
      .get('auth/current', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((response) => {
        if (response.data) {
          const user = {
            id: response.data.id,
            first_name: response.data.first_name,
            last_name: response.data.first_name,
            role: response.data.role,
            username: response.data.username,
            email: response.data.email
          }
          storageService.setCookie('user', user, 14)
        }
        return response.data
      })
  }
}

export default new AuthService()
