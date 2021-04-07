import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import OfficePage from './views/OfficePage.vue'
import OfficeCatalogue from './views/OfficeCatalogue.vue'
import LoginPage from './views/LoginPage.vue'
import RegistrationPage from './views/RegistrationPage.vue'
import EditContentPage from './views/EditContentPage.vue'
import UserProfilePage from './views/UserProfilePage.vue'
import AddCompanyPage from './views/AddCompanyPage.vue'
import AddCityPage from './views/AddCityPage.vue'
import { store } from './store'
import { sync } from 'vuex-router-sync'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import '../assets/scss/app.scss'
// require('../assets/scss/app.scss')

/* if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
} */

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    redirect: { name: 'office-catalogue' }
  },
  {
    path: '/search',
    name: 'office-catalogue',
    component: OfficeCatalogue
  },
  {
    path: '/office/:id',
    name: 'office-page',
    props: castRouteParams,
    component: OfficePage
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'registration-page',
    component: RegistrationPage
  },
  {
    path: '/user',
    name: 'user-page',
    component: UserProfilePage
  },
  {
    path: '/edit-content',
    name: 'edit-content-page',
    component: EditContentPage
  },
  {
    path: '/add-company',
    name: 'add-company-page',
    component: AddCompanyPage
  },
  {
    path: '/add-city',
    name: 'add-city-page',
    component: AddCityPage
  }
  // { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }

]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

Vue.use(VueRouter)
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable-next-line no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

function castRouteParams (route) {
  return {
    id: Number(route.params.id)
  }
}
