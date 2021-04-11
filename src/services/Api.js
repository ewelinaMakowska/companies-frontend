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
  console.log('ello dev/testing')

/*   instance =
  axios.create({
    baseURL: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
  }) */

  instance =
  axios.create({
    baseURL: `http://companies-app-backend.herokuapp.com:80`
  })
  
} else if (process.env.NODE_ENV === 'production') {
  console.log('ello')

  instance =
  axios.create({
    baseURL: `https://companies-app-backend.herokuapp.com:80`
  })

} else {
  console.log('ello else')

  instance =
  axios.create({
    baseURL: `https://companies-app-backend.herokuapp.com:80`
  })
}

if(token) {
  Object.assign(instance.defaults, {headers: {Authorization: `Bearer ${token}`}});
}

export default instance
