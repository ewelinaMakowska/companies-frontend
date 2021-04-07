<template>
  <section>
      <div class="login__background">
            <div class="login__wrapper">             
              <div class="login__box--top">
                <h1>Dodaj miasto</h1>
                  <form
                  novalidate
                  class="login"
                  @submit="addCity($event)">

                <div class="login__group">
                  <label for="form__email">Miasto</label>
                  <input
                  v-model.trim="City.name"
                  name="email"
                  type="email"
                  class="login__input"
                  placeholder="Nazwa miasta"
                  autocomplete="off"
                  data-empty='false'
                  >
                </div>

                <div class="login__group">
                  <label for="form__email">Województwo</label>
                  <input
                  v-model="City.region"
                  name="password"
                  type="text"
                  class="login__input"
                  placeholder="Województwo"
                  data-empty='false'
                  >
                </div>
               
                <input class="transparent-button"
                  type="submit"
                  value="Dodaj"
                >
              </form>

            <!-- <div v-if="($v.$anyError && !this.hideErrorMessage) || (this.backendErrors && !this.hideErrorMessage)" id="login__error-message" class="login__error-message">
                <div class="error-message__triangle"></div>
                <p>Sprawdź poprawność wpowadzonych danych <br/> i spróbuj ponownie</p>
              </div> -->
            </div> 
                         
          </div>
            

      </div>
    </section>
</template>


<script>
import CitiesService from '../services/CitiesService'

  export default {
    data() {
      return {
        City: {
          name: '',
          region: ''
        }
      }
    },
    methods: {
      capitalizeFirstLetter(string) {
        var words = string.split(' ')
        console.log(words)


        for(let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
          console.log(words[i])
        }

         return words = words.join(' ')
      },
      

      async addCity($event) {
        $event.preventDefault();

        const name = this.capitalizeFirstLetter(this.City.name)
        console.log(name)
        const region = this.City.region.toLowerCase();
        console.log(region)

        const City = {
          name: name,
          region: region
        }


      //  console.log(City.name, City.region)
         try {
          await CitiesService.addCity(City)
        } catch(err) {
          console.log(err)
        }  
      }
    }
  }
</script>