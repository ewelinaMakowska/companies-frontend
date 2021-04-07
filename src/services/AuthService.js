import Api from './Api'

export default {

  registerUser (userData) {
    return Api.post('register', userData)
  },

  login (creds) {
    return Api.post('login', creds)
  }

}
