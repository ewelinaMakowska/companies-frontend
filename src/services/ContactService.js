import Api from './Api'

export default {

  mailCompany (emailData) {
    return Api.post('email', emailData)
  }

}
