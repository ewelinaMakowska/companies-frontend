<template>
  <div>
    <section>
      <div class="login__background">
   

            <div class="login__wrapper">             
              <div class="login__box--top">
                <h1>Zaloguj się</h1>
                  <form
                  novalidate
                  class="login"
                  @submit="login($event)">

                <div class="login__group">
                  <label for="form__email">E-mail</label>
                  <input
                  id="form__email"
                  v-model.trim="email"
                  name="email"
                  type="email"
                  class="login__input"
                  placeholder="Twój adres e-mail"
                  autocomplete="off"
                  data-empty='false'
                  @click="hideErrorMessageF()"
                  @focus="hideErrorMessageF()"
                  >
                </div>

                <div class="login__group">
                  <label for="form__email">Hasło</label>
                  <input
                  id="form__password"
                  v-model="password"
                  name="password"
                  type="password"
                  class="login__input"
                  placeholder="Twoje hasło"
                  data-empty='false'
                  @click="hideErrorMessageF()"
                  @focus="hideErrorMessageF()"
                  >
                </div>
               
                <input class="login-button"
                  type="submit"
                  value="Zaloguj"
                  @click="showErrorMessageF()"
                >
              </form>

              <div v-if="($v.$anyError && !this.hideErrorMessage) || (this.backendErrors && !this.hideErrorMessage)" id="login__error-message" class="login__error-message">
                <div class="error-message__triangle"></div>
                <p>Sprawdź poprawność wpowadzonych danych <br/> i spróbuj ponownie</p>
              </div>
            </div>
                         
            <div class="login__box--bottom">
               <p class="login__text">
                Nie masz jeszcze konta? <br>
                <router-link class="login__register-link" to="/register">
                  <span class="register-link__text">Zarejestruj się!</span> 
                  <i class="material-icons-sharp register-link__icon">arrow_right_alt</i>
                </router-link>
              </p>
            </div>
          </div>
            

      </div>
    </section>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: null,
      password: null,
      userToken: null,
      errorMessageVisible: false,
      hideErrorMessage: false,
      backendErrors: false
      
    }
  }, // data
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    checkIfErrorMessageVisible() {
      var errorMessage = document.getElementById('login__error-message');
      if(errorMessage) {
        this.errorMessageVisible = true
        console.log('visible')
      } else {
        this.errorMessageVisible = false
      }
    },

    hideErrorMessageF() {
      if(this.errorMessageVisible) {
        this.hideErrorMessage = true;
      }
    },

    showErrorMessageF() {
      if(!this.errorMessageVisible) {
        this.hideErrorMessage = false;
      }
    },

    async login(e) {
      e.preventDefault()
      this.$v.$touch();

      if(!this.$v.$invalid) {
          const creds = {
            email: this.email,
            password: this.password
          }

          console.log(`E-mail: ${creds.email}`)
          console.log(`Password: ${creds.password}`)

          try {
            const response = await AuthService.login(creds)
            let refDomain = document.referrer.split('/')[2];
            let domain = window.location.href.split('/')[2]
            this.$store.dispatch('setTokenAction', response.data.token)
            this.$store.dispatch('setUserAction', response.data.user)
            this.userToken = response.data.token
 
            if(refDomain == domain) {
              window.history.go(-1)
              setTimeout(() => {
                window.location.reload()
              }, 500) 
              
            } else {
              this.$router.push({ path: 'search'})
              setTimeout(() => {
                window.location.reload()
              }, 500) 
            
            }
          } catch (err) {
            this.backendErrors = err;
          }
        } 
      } //login function

    }, //methods
    updated() {
      this.checkIfErrorMessageVisible()
     }
}
</script>

