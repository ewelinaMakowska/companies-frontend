<template>
   <div :class="[mobileMenu ? topBarMobileClass : '', topBarClass]">

      <div class="container">
        <div class="row">
          <div class="col">

            <div class="top-bar__left">
              <a href="/search">
                <img src="/assets/img/app-logo.svg" class="top-bar__logo" />
              </a>
            </div>


            <div :class="[mobileMenu ? topBarRightMobileClass : '',topBarRightClass, topBarMobilePartClass]">
              <button class="mobile-menu-trigger" id="mobile-menu-trigger" @click="toggleMobileMenu()">
                <i class="material-icons-sharp">menu</i>
              </button>

              <ul v-if="mobileMenu" class="top-bar__list">
                <li><a href="#" class="top-bar__link">Usługi</a></li>

                <li>
                  <a href="#" :class="[isPathSearch ? navButtonDecoratedClass : '', navButtonClass]" >Księgowi</a>
                </li>
                
                <li v-if="userLoggedIn && (userRole === 'admin')" id="edit-button-wrapper">
                  <router-link class="top-bar__link edit-page-link" to="/edit-content">Edycja</router-link>
                </li>


                <li v-if="userLoggedIn" class="user-bar" id="user-bar">
                  <span v-if="this.userRole === 'basic'" class="user-bar__icon user-bar__icon--basic"><i class="material-icons-sharp">person</i></span>

                  <span v-if="this.userRole === 'admin'" class="user-bar__icon user-bar__icon--admin"><i class="material-icons-sharp">person</i></span>

                  <p class="user-bar__login">{{ userLogin }}</p>                 
                </li>

                <li>
                  <router-link :to="'/login'" class="login-button blue-button top-bar__link" v-if="!$store.state.isUserLoggedIn">
                    <i class="material-icons-sharp">login</i>&nbsp;Zaloguj się
                  </router-link>
                </li>

                <li> 
                  <button
                  v-if="$store.state.isUserLoggedIn"
                  @click="logout()"
                  class="transparent-button"
                  >
                    Wyloguj
                  </button>
                </li>
              </ul>

            </div>

            <div class="top-bar__right top-bar--wide-part">
              <ul class="top-bar__list">
                <li><a href="#" class="top-bar__link">Usługi</a></li>

                <li>
                  <a href="#" :class="[isPathSearch ? navButtonDecoratedClass : '', navButtonClass]" >Księgowi</a>
                </li>
                
                <li v-if="userLoggedIn && (userRole === 'admin')">
                  <router-link class="top-bar__link edit-page-link" to="/edit-content">Edycja</router-link>
                </li>


                <li v-if="userLoggedIn" class="user-bar">
                  <span v-if="this.userRole === 'basic'" class="user-bar__icon user-bar__icon--basic"><i class="material-icons-sharp">person</i></span>

                  <span v-if="this.userRole === 'admin'" class="user-bar__icon user-bar__icon--admin"><i class="material-icons-sharp">person</i></span>

                  <p class="user-bar__login">{{ userLogin }}</p>                 
                </li>

                <li>
                  <router-link :to="'/login'" class="login-button blue-button top-bar__link" v-if="!$store.state.isUserLoggedIn">
                    <i class="material-icons-sharp">login</i>&nbsp;Zaloguj się
                  </router-link>
                </li>

                <li> 
                  <button
                  v-if="$store.state.isUserLoggedIn"
                  @click="logout()"
                  class="transparent-button"
                  >
                    Wyloguj
                  </button>
                </li>
              </ul>

            </div>

          </div>
        </div>
      </div>
      
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  name: 'TopBar',

  data () {
    return {
      navButtonClass: 'top-bar__link',
      navButtonDecoratedClass: 'top-bar__link--decorated',
      mobileMenu: false,
      topBarClass: 'top-bar',
      topBarRightClass: 'top-bar__right',
      topBarMobileClass: 'top-bar--mobile',
      topBarRightMobileClass: 'top-bar__right--mobile',
      topBarMobilePartClass: 'top-bar--mobile-part'
    }
  },

computed: {
  userLogin() {
    return this.$store.getters.getUserLogin;
  },

  userLoggedIn() {
    return this.$store.getters.user;
  },

  userRole() {
    return this.$store.getters.userRole;
  },

  isPathSearch() {
    if(this.$route.path === '/search') {
      return true
    } else {
      return false
    }
  }
},

  methods: {
    logout() {
      this.$store.dispatch('setTokenAction', null)
      this.$store.dispatch('setUserAction', null)

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isUserLoggedIn')

      window.location.reload()

      // todo: remove token from local storage
    },

    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
    }
  } 

}// export default

</script>