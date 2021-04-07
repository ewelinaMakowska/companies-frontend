import Vue from 'vue'
import Vuex from 'vuex'

import CompaniesService from '../services/CompaniesService.js' // eslint-disable-line no-unused-vars
import CitiesService from '../services/CitiesService.js'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loadedOffices: [
    ], // simple offices on page
    allCompaniesCount: 0, // number of companies by city
    companiesByCity: [],
    count: 0,
    cities: {
      count: null,
      citiesList: null
    },
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
    isUserLoggedIn: localStorage.getItem('isUserLoggedIn') || null,
    settings: {
      filters: {
        sort: {
          showBubble: localStorage.getItem('showSortBubble') || false,
          priceAsc: false,
          priceDesc: false,
          nameAsc: false,
          nameDesc: false
        },

        filters: {
          showBubble: localStorage.getItem('showFiltersBubble') || false,
          ledger: false,
          lumpSum: false,
          remote: false,
          inPerson: false
        }
      }
    }
  },

  mutations: {

    loadCompanies: (state, data) => {
      let dataRows;
      dataRows = data.rows
      console.log(dataRows.length)
   
      for(let i = 0; i < dataRows.length; i++) {
        console.log(dataRows[i].City.name)
        dataRows[i].City = `${dataRows[i].City.name}, ${dataRows[i].City.region}`
      }

      state.loadedOffices = dataRows;
      state.allCompaniesCount = data.count
      state.count = data.rows.length
      // console.log(state);
    },

    loadCompanyMutation: (state, data) => {
     // state.loadedOffices = data
      //state.allCompaniesCount = data.length

      console.log(data)
      data.City = `${data.City.name}, ${data.City.region}`

      state.loadedOffices = data;
      state.allCompaniesCount = data.length
    },

    loadCitiesMutation: (state, data) => {
      state.cities.citiesList = data.rows
      // state.allCitiesCount = data.length;
    },

    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
        localStorage.setItem('isUserLoggedIn', true)
      } else {
        localStorage.setItem('isUserLoggedIn', true)
      }
    },

    setUser (state, user) {
      state.user = user
    },

    showSortBubble(state) {
      state.settings.filters.sort.showBubble = true;
      localStorage.setItem('showSortBubble', true)
    },

    showFiltersBubble(state) {
      state.settings.filters.filters.showBubble = true;
      localStorage.setItem('showFiltersBubble', true)
    },

    hideSortBubble(state) {
      state.settings.filters.sort.showBubble = false;
      localStorage.removeItem('showSortBubble', false)
    },

    hideFiltersBubble(state) {
      state.settings.filters.filters.showBubble = false;
      localStorage.removeItem('showFiltersBubble', false)
    }

  },
  actions: {
    async deleteCompany({commit}, companyId) {
      const deletedRows = await CompaniesService.deleteCompany(companyId);
      console.log('action deleteCompany executed succesfully')
    },

    async addCompany(companyData) {
      const company = await CompaniesService.addCompany(companyData.name, companyData.price, companyData.cityid, companyData.email, companyData.description, companyData.ledger, companyData.lumpSum, companyData.inPerson);
      console.log('action addCompany executed succesfully')
    },

    async loadCompaniesAction ({ commit }) {
      const result = await CompaniesService.getAllCompanies()
      commit('loadCompanies', result.data)
      console.log('action loadCompanies executed succesfully')
    },

    async loadCities ({ commit }) {
      const result = await CitiesService.getAllCities()
      commit('loadCitiesMutation', result.data)
      console.log('action loadCities executed succesfully')
    },

    async loadCitiesFilteredLimited ({ commit }, value) {
      const result = await CitiesService.getFilteredLimited(value)
      commit('loadCitiesMutation', result.data)
      console.log('action loadCitiesFilteredLimited executed succesfully')
    },

    async loadOnePageData ({ commit }, page) {
      const result = await CompaniesService.getLimited(page)
      console.log(result)
      commit('loadCompanies', result.data)
      console.log('action loadOnePageData executed succesfully')
    },

    async loadSearchResults ({ commit }, search) {
      const result = await CompaniesService.getFiltered(search)
      console.log(result)
      commit('loadCompanyMutation', result.data)

      console.log('action load Search Results executed succesfully')
    },

    async loadSearchResultsLimited ({ commit }, searchParameters) {
      const result = await CompaniesService.getFilteredLimited(searchParameters.city, searchParameters.sort, searchParameters.accounting, searchParameters.contact, searchParameters.page)
      commit('loadCompanies', result.data)
      console.log('action load Search Results Limited executed succesfully')
    },

    async loadSearchResultsSimple ({ commit }, searchParameters) {
      const result = await CompaniesService.getByNameOrID(searchParameters.searchValue, searchParameters.page)
      commit('loadCompanies', result.data)
      console.log('action load Search Results simple exectued successfully')
    },

    async loadFirstPageData ({ commit }) {
      const result = await CompaniesService.getFirstLimited()
      commit('loadCompanies', result.data)
      console.log('action loadOnePageData executed succesfully')
    },

    async loadCompany ({ commit }, id) {
      const result = await CompaniesService.getOne(id)
      commit('loadCompanyMutation', result.data)
      console.log('action loadCompany executed succesfully')
    },

    setTokenAction ({ commit }, token) {
      commit('setToken', token)
      // localStorage.setItem('token', token);
      localStorage.setItem('token', JSON.stringify(token))
    },

    setUserAction ({ commit }, user) {
      commit('setUser', user)
      localStorage.setItem('user', JSON.stringify(user))
    },

    showSortBubble({ commit }) {
      commit('showSortBubble')
    },

    showFiltersBubble({ commit }) {
      commit('showFiltersBubble')
    },

    hideSortBubble({ commit }) {
      commit('hideSortBubble')
    },

    hideFiltersBubble({ commit }) {
      commit('hideFiltersBubble')
    },


  },

  getters: {
    state (state) {
      return state
    },

    userRole(state) {
      if(state.user) {
        const user = JSON.parse(state.user);
        const role = user.role;
        return role
      } else {
        return false
      }
    },

    loadedOffices (state) {
      return state.loadedOffices
    }, // loadoffices

    loadedCities (state) {
      return state.cities.citiesList
    },

    loadedOffice (state) {
      return (officeId) => {
        return state.loadedOffices.find((office) => {
          return office.id === officeId
        }) // return state.loaded...
      } // return officeId
    }, // loadOffice //getter szukający w stanie w załadowanych wszystkich biurach :|

    countValue (state) {
      return state.allCompaniesCount
    },

    getFiltersVisibilitySettings(state) {
      return state.settings.filters;
    },

    getUserLogin(state) {
      const user = JSON.parse(state.user);
      let userLogin = user.email;
      
      return userLogin;
    },

    token(state) {
      return state.token;
    },

    user(state) {
      return state.user;
    }

  }, // getters

  modules: {
  } // modules

}) // vue store
