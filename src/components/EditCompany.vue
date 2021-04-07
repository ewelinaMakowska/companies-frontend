<template>
  <div class="container">
      <form @submit="updateCompany($event)" novalidate id="edit-company">
      <div class="row">
        <div class="col-lg-12">
          <h1>Edytuj firmę</h1>
          <div class="c-profile__title c-profile__title--edit">
            <img src="/assets/img/dummy-logo.svg" class="thumb__logo" alt="company logo" />
            <div>
              <h2> 
                <input 
                type="text"
                :placeholder="company.name"
                v-model.trim="name"
                class="add-company__name add-company__input"
                />              
              </h2>
              
              <span class="c-profile__location">
                <input 
                type="search"
                :placeholder="company.City"
                v-model.trim="city"
                @keyup="loadCitiesFilteredLimited($event)"
                @blur="hideAutocompleteWrapperDelayed($event)"           
                id="city-input"
                autocomplete="off"
                class="add-company__city add-company__input"
                @clik="this.selected=false"
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
                v-model.trim="description"
                :placeholder="company.description"
                class="add-company__description add-company__textarea"
                />
              </div>
            </div>

            <div class="price-wrapper">
              <div class="basic-data__price">
                <p class="d-inline-block">Od &nbsp;</p>
                  <input 
                  type="text"
                  v-model.trim="price"
                  :placeholder="company.price"
                  class="add-company__input add-company__price add-company__price--edit d-inline-block"
                  />
                <p class="d-inline-block"> &nbsp;zł/msc</p><br/>

                <button 
                @click="exitEditionMode()"
                class="orange-button edit-company-btn edit-company-btn--transparent">
                Wyjdź z edycji
                </button>

                <input 
                type="submit" 
                value="Wyślij"
                class="contact_us-button">
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
                    @change="ledger=!ledger; setChecked($event)"
                     />
                    <label for="ledger">
                      Księga Przychodów i Rozchodów
                    </label>                 
                  </li>

                  <li>
                    <input 
                    type="checkbox"
                    id="lump-sum"
                    @change="lumpSum=!lumpSum; setChecked($event)"
                     />
                    <label for="lump_sum">
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
                    @change="inPerson=!inPerson; setChecked($event)"
                     />
                    <label for="in-person">
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
                    :placeholder="company.email"
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
                  v-model.trim="additionalPoints"
                  :placeholder="company.additionalPoints"
                  class="add-company__textarea add-company__email"
                  title="Dodatkowe informacje"
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
        selected: true
      }
    },
    methods: {
      async updateCompany($event) {
        $event.preventDefault()

        let ledgerCheckbox = document.getElementById('ledger')
        let lumpSumCheckbox = document.getElementById('lump-sum')
        let inPersonCheckbox = document.getElementById('in-person')

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


        //add only changed data

      let dataToSend = {
        id: this.$props.company.id,
        name: this.$props.company.name,
        cityId: this.$props.company.cityId,
        price: this.$props.company.price,
        email: this.$props.company.email,
        description: this.$props.company.description,
        ledger: this.$props.company.ledger,
        lumpSum: this.$props.company.lump_sum,
        inPerson: this.$props.company.in_person,
        additionalInfo: this.$props.company.additional_points,
      }

      if(this.name) {
        dataToSend.name = this.name
      }

      if(this.cityId) {
        dataToSend.cityId = this.cityId
      }

      if(this.price) {
        dataToSend.price = this.price
      }

      if(this.description) {
        dataToSend.description = this.description
      }

      if(this.email) {
        dataToSend.email = this.email
      }

      if(this.additionalPoints) {
        dataToSend.additionalInfo = this.additionalPoints
      }

      if(this.email) {
        dataToSend.email = this.email
      }

      if(ledgerCheckbox.hasAttribute('checked')) {
        dataToSend.ledger = 1;
      } else {
        dataToSend.ledger = 0;
      }

      if(lumpSumCheckbox.hasAttribute('checked')) {
        dataToSend.lumpSum = 1;
      } else {
        dataToSend.lumpSum = 0;
      }

       if(inPersonCheckbox.hasAttribute('checked')) {
        dataToSend.inPerson = 1;
      } else {
        dataToSend.inPerson = 0;
      }

      

      console.log(dataToSend)


      try {
        const company = await CompaniesService.updateCompany(dataToSend);
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

      setChecked($event) {
        console.log('checked')
        if($event.target.hasAttribute('checked')) {
          $event.target.removeAttribute('checked');
        } else {
          $event.target.setAttribute('checked', 'true');
        }
      },

    //handler of a button with city name - ads cityid to url
      async autocompleteInput ($event) {
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

      checkInputs() {
        if(this.$props.company.ledger) {
          document.getElementById('ledger').setAttribute('checked', true)
        }

        if(this.$props.company.lump_sum) {
          document.getElementById('lump-sum').setAttribute('checked', true)
        }

         if(this.$props.company.in_person) {
          document.getElementById('in-person').setAttribute('checked', true)
        }
      },

      exitEditionMode() {
        const companyId = this.$route.params.id;
        history.pushState({}, '', `/office/${companyId}`);
        window.location.reload()
      }
    },

    computed: {
      cities() {
        return this.$store.getters.loadedCities
      }
    },

    mounted() {
      this.checkInputs();
    },

    update() {

    },
    props: {
      company: Object
    }
  }
</script>