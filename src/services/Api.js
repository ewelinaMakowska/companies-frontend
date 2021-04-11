// import axios from 'axios'

// export default () => {
//     return axios.create({
//         baseURL: `http://localhost:3306`
//     })
// }

import axios from 'axios'
import { store } from '../store/index';

let token = 'token';

if(store.getters.token) {
  token = store.getters.token.replace(/['"]+/g, '');
}

let instance;

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing' || !process.env.NODE_ENV) {
  instance =
  axios.create({
    baseURL: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
  })
} else {
  console.log('ello')

  instance =
  axios.create({
    baseURL: `https://companies-app-backend.herokuapp.com:80`
  })

}

if(token) {
  Object.assign(instance.defaults, {headers: {Authorization: `Bearer ${token}`}});
}

export default instance
