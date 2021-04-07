import Api from './Api'

export default {

  getAllCities () {
    return Api.get('cities')
  },

  getFilteredLimited (value) {
    return Api.get(`citiesFilteredLimited/?name=${value}`, value)
  },

  addCity(City) {
    console.log('SERVICE')
    console.log(City.name, City.region)
    return Api.post('addCity', City)
  }

}
