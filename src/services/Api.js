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

const instance =
  axios.create({
    baseURL: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
  })

if(token) {
  Object.assign(instance.defaults, {headers: {Authorization: `Bearer ${token}`}});
}

export default instance
