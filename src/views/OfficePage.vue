<template>
  <div>
    <top-bar></top-bar>


    <section class="c-profile__info">
      <div class="container">
        <div class="row">
          <div class="col-lg-12" v-if="(this.$route.query.edit =='false' || !this.$route.query.edit) && notLoading">
            <!-- v-if="this.$route.query.edit=='false'" -->
            <company-info :company="company" />            
          </div>
        </div>
      </div>
    </section>


    <section v-if="(this.$route.query.edit =='false' || !this.$route.query.edit) && notLoading && company.email">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <contact-form :company="company"  />
          </div>
        </div>
      </div>
    </section>

    
    <section id="edit-company" v-if="this.$route.query.edit =='true' && notLoading">
      <edit-company :company="company" />
    </section>
    
  </div> 
</template>


<script>
  import TopBar from '../components/TopBar.vue' 
  import CompanyInfo from '../components/CompanyInfo.vue'
  import ContactForm from '../components/ContactForm.vue'
  import EditCompany from '../components/EditCompany.vue'

  export default {
    components: {
      TopBar,
      CompanyInfo,
      ContactForm,
      EditCompany
    },

    data() {
      return {
        notLoading: false
      }
    },

    computed: {
      company() {
        return this.$store.getters.loadedOffices
      } 
    }, 

    async mounted() {
      console.log('Mounted')
      let id = this.rememberId();

      try {
        await this.loadCompany(id)
        console.log('company loaded to the state')
      } catch (err) {
        console.log('fail')
        console.log(err)
      } finally {
        console.log('company loaded')
    } 
    }, 

    methods: {
      rememberId() {
        let url = window.location.href;
        let params = url.split('/');
        let id = params[params.length-1];
        console.log(params);
        console.log(id);
        return id;
      },
      
      async loadCompany(id) {
    /*     await this.$store.dispatch('loadCompany', id)
        .then(() => {
            this.notLoading = true;
            console.log('LOADED')
        })
        .catch(function (error) {
          console.log(error);
          this.notLoading = false;
        }) */
        try {
          await this.$store.dispatch('loadCompany', id)
          this.notLoading = true;
          console.log('LOADED')
        } catch(err) {
          console.log(error);
          this.notLoading = false;
        } 
      },

    },

  }

</script>
