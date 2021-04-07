<template>
  <div class="search">

    <div
      class="search__input-wrapper"
    >
      <input
        id="search"
        autocomplete="off"
        class="search__input"
        type="search"
        placeholder="Miejscowość"
        @keyup="loadCitiesFilteredLimited($event)"
        @focus="setSearching()"
        @blur="setSearchingFalse()"
      >
      <i class='material-icons-sharp search__icon' id="search__icon">search</i>
    </div>
    
    <div class="autocomplete__wrapper" id="autocomplete__wrapper" tabindex="0" v-show="(this.searching)">
      <div class="autocomplete">
        <ul class="autocomplete__list">
          <li
            v-for="(city, id) in cities"
            :key="id"
          >
            <button
              class="autocomplete_button"
              @click="autocompleteInput($event)"
            > 
            
              {{ city.name }}, {{ city.region }}
              <span class="cityid" style="display:none;">{{city.id}}</span>
            </button>
          </li>
        </ul>

        <!-- <div
          class="autocomplete__outside"
          @click="setSearchingFalse()"
        /> -->
      </div> <!--div autocomplete -->
    </div> <!--div v-shwo -->
    <!-- sortowanie -->
  </div> <!--search-->
</template>


<script>
  export default {
    data () {
      return {
        searching: 0,
      }
    },

    computed: {
      currentPageNumber() {
        return 1
      },
      cities() {
        return this.$store.getters.loadedCities
      },
    },

    methods: {
      hideSearchIcon() {
        const searchIcon = document.getElementById('search__icon');

         if(searchIcon.classList.contains('visible--block')) {
          searchIcon.classList.remove('visible--block')
        }

        searchIcon.classList.add('hidden')
      },

      showSearchIcon() {
        const searchIcon = document.getElementById('search__icon');

        if(searchIcon.classList.contains('hidden')) {
          searchIcon.classList.remove('hidden')
        }

        searchIcon.classList.add('visible--block')
      },

      setSearching(){
        this.searching = 1;
        console.log('set searching true')
        this.hideSearchIcon();
      },

      setSearchingFalse(){
        setTimeout(() => {
          this.searching = 0;
          this.showSearchIcon();
          console.log('set searching false')
        }, 500)
      },

      async loadCities () {
        await this.$store.dispatch('loadCities')
          .catch(function (error) {
            console.log(error)
          })
        console.log(this.$store.getters.state.cities.citiesList)
      },

    //handler of a button with city name - ads cityid to url
      async autocompleteInput ($event) {
        const cityID = $event.target.childNodes[1].innerText;
        const cityName = $event.target.innerText;
        const searchInput = document.getElementById('search');


        console.log($event.target)
        console.log('')
        console.log('')
        console.log(cityID)
        console.log(cityName)

        searchInput.value = cityName;
        this.$router.push({ path: 'search', query: { city: cityID, page: 1}})
        window.location.reload();

      // await this.searchResults()
       // document.getElementsByClassName('autocomplete')[0].classList.add('hidden')
      },

    //gets list of cities and shows it
      async loadCitiesFilteredLimited($event) {
        const name = document.getElementById('search').value;
        console.log(`name: ${name}`)

        if (name.length >= 1 && name != ' '){
          await this.$store.dispatch('loadCitiesFilteredLimited', name)
          .catch(function (error) {
            console.log(error)
          })
          this.searching = 1 
        } else {
          this.searching = 0
        }
      },

      async searchByCity (search) {
        console.log(`search: ${search}`)

        await this.$store.dispatch('loadSearchResults', search)
          .catch(function (error) {
            console.log(error)
          })
        console.log(this.$store.getters.state)
      },

      async searchResults (search) {
        console.log(`search: ${search}`)
        const searchParameters = { city: this.search, page: '1' }
        console.log(`search page: ${this.searchParameters}`)

        await this.$store.dispatch('loadSearchResultsLimited', searchParameters)
          .catch(function (error) {
            console.log(error)
          })
        console.log(this.$store.getters.state)
      },

      setAutocompleteWidth() {
        const search = document.getElementById('search');
        const autocomplete = document.getElementById('autocomplete__wrapper');
        const autocompleteWidth = search.offsetWidth;
        console.log(autocompleteWidth)
        autocomplete.style.width = autocompleteWidth + 'px';
      }
    },

    updated() {
      this.setAutocompleteWidth();
    }

  }
</script>

