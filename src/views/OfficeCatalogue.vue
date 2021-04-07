<template>
  <div class="animate__animated animate__fadeIn" style="position: relative;">

   <top-bar></top-bar>

    <div
      id="main-container"
      class="main-container container"
    >
      <div class="row">
        <div class="col-lg-12">

          <div class="search-options">
            <search />
            <filters />
          </div>  
             
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
     

              <div class="thumbs" id="thumbs" v-if="loaded">
                <office-thumb
                  v-for="(office, id) in offices"
                  :id="office.id "
                  :key="id"
                  :name="office.name"
                  :city="office.City"
                  :office="office"
                  :price="office.price"
                  :description="office.description"
                />
              </div> 

              <pagination v-if="loaded" :number-of-pages="pageCount" />
              
              <div class="thumbs__thumb patch-div" id="patch-div" style="display: none" ></div>
            </div>
      </div>
    </div>

  <footer-component />
  </div>

</template>


<style lang="scss">
    .office-thumb {
        color: #ffffff;
        background: black;
        }

    @import '../../assets/scss/app.scss';

</style>

<script>
  import TopBar from '../components/TopBar.vue' 
  import OfficeThumb from '../components/OfficeThumb.vue'
  import Pagination from '../components/Pagination.vue' // eslint-disable-line no-unused-vars
  import Search from '../components/Search.vue'
  import Filters from '../components/Filters.vue'
  import FooterComponent from '../components/Footer.vue'

  export default {
    name: 'OfficeCatalogue',
    components: {
      TopBar,
      OfficeThumb,
      Pagination,
      Search,
      Filters,
      FooterComponent
    },

    data() {
      return {
        office: {},
        pages: this.pages,
        city: 'Warszawa', // this.$route.query.city
        value: 0,
        currentPageNumber: null,
        loaded: false,
        searchParams: null
      }
    },

    computed: {
      offices () {
        return this.$store.getters.loadedOffices
      },
      loadCompanies () {
      //  return this.$store.dispatch('loadCompaniesAction')
      },
      pageCount() {
        return Math.ceil((this.$store.getters.countValue) / 9)
      },
      loadFirst() {
        //return this.$store.dispatch('loadFirstPageData')
      },
    },

    async created() {
      console.log('Created')

      //check if officepage
      let url = window.location.href.split('/');
      console.log(url)

      if(url[3] !== 'office' ){
        let searchParams = {
          city: null,
          sort: null,
          accounting: null,
          contact: null,
          page: null,

      }  

      if (this.$route.query.city) {searchParams.city = this.$route.query.city } else {searchParams.city = '' }
      if (this.$route.query.sort) {searchParams.sort = this.$route.query.sort } else {searchParams.sort = '' }
      if (this.$route.query.accounting) {searchParams.accounting = this.$route.query.accounting } else {searchParams.accounting = '' }
      if (this.$route.query.contact) {searchParams.contact = this.$route.query.contact } else {searchParams.contact = '' }
      if (this.$route.query.page) {searchParams.page = this.$route.query.page } else {searchParams.page = 1 }


      console.log(searchParams.page)
      console.log(searchParams.city)
      console.log(searchParams.sort)
      console.log(searchParams.accounting)
      console.log(searchParams.contact)

    if (searchParams.city || searchParams.accounting || searchParams.contact) {
      try {
        await this.loadSearchResults(searchParams).then(() => {
          console.log('companies loaded to the state');
          this.loaded = true;
        })
      } catch (err) {
        console.log('fail')
        console.log(err)
      } finally {
        console.log('state getter used')
      } // trycatch 

      } else {
        try {
          await this.loadPage(searchParams).then(() => {
          console.log('companies loaded to the state');
          this.loaded = true;
        })
        } catch (err) {
          console.log('fail')
        } finally {
          console.log('state getter used')
        } // trycatch
      }
      this.searchParams = searchParams;
      }
    }, // created

    updated() {
      console.log('HOOOK')
      this.fixFlexContainer();
    },

    methods: {
      loadPage(page) {
        return this.$store.dispatch('loadOnePageData', page)
      },
      loadSearchResults(value) {
        return this.$store.dispatch('loadSearchResultsLimited', value)
      },
      fixFlexContainer() {
        let thumbsContainer = document.getElementById('thumbs')
        let thumbs = thumbsContainer.children;
        let patchDiv = document.getElementById('patch-div')

        if(thumbs.length % 3 != 0) {
          thumbsContainer.append(patchDiv)
          patchDiv.style.opacity = 0;
          patchDiv.style.display = "block";
        }

      }
  /*     logout () {
        this.$store.dispatch('setTokenAction', null)
        this.$store.dispatch('setUserAction', null)

        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('isUserLoggedIn')

      } */
    } //

  }// export default

</script>
