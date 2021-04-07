<template>
  <div style="position: relative; min-height: 100vh;">
    <top-bar />

    <section class="find-companies">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1>Wyszukaj firmy</h1>

            <form @submit="submitForm($event)">
              <input 
              class="edit__search"
              type="search" 
              id="search-id-name-input" 
              v-model.trim="searchValue" 
              autocomplete="off"
              placeholder="ID lub nazwa firmy" />

              <input
                type="submit"
                value="Szukaj"
                class="edit__search-button"              
              />
            </form>

          </div>
        </div>
      </div>
    </section>



    <section v-if="loaded" id="found-companies" class="found-companies">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h2>Znalezione firmy:</h2>

              <div class="companies-list__company--header">
                <div class="companies-list__id">
                  ID
                </div>

                <div class="companies-list__name">
                  Nazwa
                </div>

                <div class="companies-list__location">
                  Lokalizacja
                </div>

                <div class="companies-list__buttons">
                  
                </div>
              </div>

              <div class="companies-list">
                <div v-for="(office, id) in offices" :key="id" class="companies-list__company">
                  <div class="companies-list__id">
                    {{office.id}}
                  </div>

                  <div class="companies-list__name">
                    {{office.name}}
                  </div>

                  <div class="companies-list__location">
                    {{office.City}}
                  </div>

                  <div class="companies-list__buttons">
                    <router-link :to="'/office/' + office.id" class="light-button">Profil</router-link>

                    <router-link :to="'/office/' + office.id + '?edit=true#edit-company'" class="light-button">Edytuj</router-link>

                    <button @click="deleteCompany($event)" :id="office.id" class="orange-button">Usuń</button>
                  </div>
                </div>
              </div> 

    
                  
          </div>
        </div>
      </div>
    </section>

    <section class="add-company">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1>Dodaj firmę </h1>
            <p>Dodaj nową firmę za pomocą prostego formularza.</p>
            <router-link to="add-company" class="add-company-link">
              Dodaj <i class="material-icons-sharp">chevron_right</i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

  <footer-component />
  </div>
</template>

<script>
  import TopBar from '../components/TopBar.vue'
  import FooterComponent from '../components/Footer.vue'

  export default {
    data () {
      return {
        searchValue: null,
        loaded: false
      }
    }, // data

    components: {
      TopBar,
      FooterComponent
    },

    methods: {
      async deleteCompany($event) {
        const id = $event.target.id;
        let companyId = parseInt(id)

        try {
          await this.$store.dispatch('deleteCompany', companyId);
        } catch(err) {
          console.log(err)
        }
      },

      loadSearchResultsSimple(searchParameters) {
        return this.$store.dispatch('loadSearchResultsSimple', searchParameters)
      },

      async submitForm($event) {
        $event.preventDefault();
      
        var searchParameters = {
          searchValue: this.searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          page: 1
        }

        try {
            let url = window.location.href.split('/');
            let path = url[url.length-1].split('?')
            let newUrl = url[0] + '//' +url[2] + '/' + path[0] + '?'
            newUrl += `search=${searchParameters.searchValue}&page=1`
            window.location.href = newUrl; 
            this.loaded = true;
          } catch(err) {
            console.log(err)
        } 

    
      }
    },
    computed: {
      offices() {
        return this.$store.getters.loadedOffices
      }
    },

    async created() {
      if(!this.$route.query.page || !this.$route.query.search) {
          console.log('test')
        } else {
          const searchParameters = {
            searchValue: this.$route.query.search,
            page: this.$route.query.page, 
          }

        const companies = await this.loadSearchResultsSimple(searchParameters).then(() => {
          this.loaded = true;
        })
        } 
    
    
    }

  }

</script>
