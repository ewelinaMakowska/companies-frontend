<template>
  <div class="container">

    <form @submit="addCompany($event)" novalidate id="add-company">
      <div class="row">
        <div class="col-lg-12">
          <h1>Dodaj firmę</h1>
          <div class="c-profile__title c-profile__title--edit">
            <img src="/assets/img/dummy-logo.svg" class="thumb__logo" alt="company logo" />
            <div>
              <h2> 
                <input 
                type="text"
                placeholder="Nazwa firmy"
                v-model.trim="name"
                class="add-company__name add-company__input"
                />              
              </h2>

              <span class="c-profile__location">
                <input 
                type="search"
                placeholder="Miasto"
                v-model.trim="city"
                @keyup="loadCitiesFilteredLimited($event)"
                @blur="hideAutocompleteWrapperDelayed($event)"           
                id="city-input"
                autocomplete="off"
                class="add-company__city add-company__input"
                />

                 <div class="autocomplete__wrapper add-company__autocomplete" tabindex="0" id="autocomplete-wrapper" 
                 style="opacity: 0">
                  <div class="autocomplete">
                    <ul class="autocomplete__list">
                      <li
                        v-for="(city, id) in cities"
                        :key="id"
                      >
                        <button
                          class="autocomplete_button"
                          @click="autocompleteInput($event, hideAutocompleteWrapperDelayed($event))"
                        >                        
                           {{ city.name }}, {{ city.region }}
                          <span class="cityid" style="display:none;">{{city.id}}</span>
                        </button>
                      </li>
                    </ul>

                    <div class="add-city-btn__wrapper">
                      <router-link to='add-city' id="add-city-btn" class="transparent-button add-city-btn" disabled>Dodaj miasto</router-link>
                    </div>
                  </div> <!--div autocomplete -->
                </div> <!-- /autocomplete wrapper -->

              </span>                
            </div>
            
          </div>

          <div class="c-profile__basic-data">
            <div class="basic-data__description basic-data__description--edit">
              <div class="company-description__wrapper">
                <textarea 
                type="text"
                placeholder="Opis firmy"
                v-model.trim="description"
                class="add-company__description add-company__textarea"
                />
              </div>
            </div>

            <div class="price-wrapper">
              <div class="basic-data__price">
                <p>Od &nbsp;
                  <input 
                  type="text"
                  v-model.trim="price"
                  class="add-company__input add-company__price"
                  />
                 &nbsp;zł/msc</p>
                <input 
                type="submit" 
                value="Dodaj"
                class="blue-button contact_us-button">
              </div>
            </div>
          </div>

          <div class="c-profile__flex-list">
            <div class="flex-list__item">                   
              <i class="material-icons-sharp checkmark">done</i>
              <p class="main-text">
                obsługiwane sposoby rozliczania:<br/>
              </p>
                <ul class="sublist sublist--edit">
                  <li >
                    <input 
                    type="checkbox"
                    id="ledger"
                    @change="ledger=!ledger"
                     />
                    <label for="ledger">
                      Księga Przychodów i Rozchodów
                    </label>                 
                  </li>

                  <li>
                    <input 
                    type="checkbox"
                    id="lump-sum"
                    @change="lumpSum=!lumpSum"
                     />
                    <label for="ledger">
                      Ryczałt
                    </label>    
                  </li>
                </ul>
            </div>

            <div class="flex-list__item">                   
              <i class="material-icons-sharp checkmark">done</i>
              <p class="main-text">
                kontakt z księgowym:<br/>
              </p>
                <ul class="sublist sublist--edit">
                  <li >
                    <input 
                    type="checkbox"
                    id="remote"
                    checked
                    @change="remote=!remote" 
                     />
                    <label for="remote">
                      Telefoniczny/on-line
                    </label>   
                  </li>
                  <li>
                    <input 
                    type="checkbox"
                    id="in-person"
                    @change="inPerson=!inPerson"
                     />
                    <label for="inperson">
                      Osobisty
                    </label>   
                  </li>
                </ul>
            </div>

            <div class="flex-list__item">                   
              <i class="material-icons-sharp checkmark">done</i>
              <p class="main-text">
                adres e-mail:<br/>
              </p>
                <ul class="sublist">
                  <li>
                    <input 
                    type="email"
                    placeholder="Adres mailowy firmy"
                    v-model.trim="email"
                    class="add-company__input add-company__email"
                    />
                    </li>
                </ul>
            </div>


            <div class="flex-list__item">                   
              <i class="material-icons-sharp checkmark">done</i>
              <p class="main-text">
                <textarea 
                  placeholder="Dodatkowe informacje"
                  v-model.trim="additionalPoints"
                  class="add-company__textarea add-company__email"
                  />
                <br/>
              </p>
            </div>

          </div>

        </div>
      </div>
    </form>
    </div>

</template>

<style scoped>
</style>

<script>
import CompaniesService from '../services/CompaniesService'

  export default {
    data() {
      return {
        name: '',
        city: '',
        region: '',
        price: '',
        description: '',
        email: '',
        additionalPoints: '',
        cityname: '',
        cityId: null,
        ledger: false,
        lumpSum: false,
        remote: true,
        inPerson: false,
        selected: false
      }
    },
    methods: {
      async addCompany($event) {
        $event.preventDefault()
        if(this.selected == true) {
          let price = this.price.split('')  

        price = price.map(function(character) {
          if(character === ',') {
            return '.'
          } else {
            return character
          }
        })

        price = price.join('')

        const data = {
          name: this.name,
          city: this.city,
          cityId: parseInt(this.cityId),
          price: parseFloat(price),
          description: this.description,
          email: this.email,
          additionalPoints: this.additionalPoints,
          ledger: this.ledger,
          lumpSum: this.lumpSum,
          inPerson: this.inPerson,
        }

        console.log(`name: ${data.name}, city name: ${data.city}, city id: ${data.cityId}, price: ${data.price}, description: ${data.description}, email: ${data.email}, additional info: ${data.additionalPoints}, ledger: ${data.ledger}, lump sum: ${data.lumpSum}, contatct in person : ${data.inPerson}`)

        try {
          const company = await CompaniesService.addCompany(data);
          console.log(company)
        } catch(err) {
          console.log(err)
        }
        } else {
          console.log('CITY MUST BE CHOSEN FROM LIST')
        }
      },
      hideAutocompleteWrapper() {
        const autocompleteWrapper = document.getElementById('autocomplete-wrapper')

        if(autocompleteWrapper) {
          autocompleteWrapper.style.opacity = 0
          autocompleteWrapper.style.height = 0;
          autocompleteWrapper.style.overflow = 'hidden';
          console.log('autocomplete hidden')
        }
      },

      hideAutocompleteWrapperDelayed() {
        setTimeout(() => {
          this.hideAutocompleteWrapper();
        }, 200)
      },

      showAutocompleteWrapper() {
        const autocompleteWrapper = document.getElementById('autocomplete-wrapper')

        autocompleteWrapper.style.opacity = 1;
        autocompleteWrapper.style.height = 'auto';

        console.log('autocomplete shown')
      },

      async loadCities () {
        await this.$store.dispatch('loadCities')
          .catch(function (error) {
            console.log(error)
          })
        console.log(this.$store.getters.state.cities.citiesList)
      },

    //handler of a button with city name - ads cityid to url
      async autocompleteInput ($event, callback) {
        this.selected = true;
        $event.preventDefault();

        const cityID = $event.target.childNodes[1].innerText;
        const cityName = $event.target.innerText;
        const searchInput = document.getElementById('city-input');


        console.log($event.target)
        console.log('')
        console.log('')
        console.log(cityID)
        console.log(cityName)

        searchInput.value = cityName;
        this.city = cityName;
        this.cityId = $event.target.querySelector('.cityid').innerText;
      },

    //gets list of cities and shows it
      async loadCitiesFilteredLimited($event) {
        this.selected = false;
        const name = document.getElementById('city-input').value;
        console.log(`name: ${name}`)

        await this.$store.dispatch('loadCitiesFilteredLimited', name)
          .catch(function (error) {
            console.log(error)
          })

        var autocompleteWrapper = document.getElementById('autocomplete-wrapper');
        var addCityBtn = document.getElementById('add-city-btn');

        if ($event.target.value!='' && autocompleteWrapper && addCityBtn ){
          this.showAutocompleteWrapper()
          addCityBtn.removeAttribute('disabled')
        } else {
          this.hideAutocompleteWrapper()
          addCityBtn.setAttribute('disabled', '')
        }
      },
    },
    computed: {
      cities() {
        return this.$store.getters.loadedCities
      }
    },
    update() {

    }
  }
</script>