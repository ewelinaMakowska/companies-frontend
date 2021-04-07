<template>
  <div class="row">
    <div class="col-lg-12">

      <div class="c-profile__title">
        <img src="/assets/img/dummy-logo.svg" class="thumb__logo" alt="company logo" />
        <div>
          <h1>{{ company.name }}</h1>
          <span class="c-profile__location">
            {{ company.City }}
          </span>                
        </div>
        
      </div>

      <div class="c-profile__basic-data">
        <div class="basic-data__description">
          <p class="main-text">
            {{ company.description }}
          </p>
        </div>

        <div class="price-wrapper">
          <div class="basic-data__price">
            <p>Od &nbsp;<span>{{ company.price }}</span> &nbsp;zł/msc</p>

            <a href="#contact-form" v-if="company.email" class="blue-button contact_us-button">
              Skontaktuj się z nami
            </a>
              
             <br/>
  
            <button 
            v-if="$store.state.user && ($store.getters.userRole == 'admin')" 
            :class="[!company.email ? mtMinusClass : '', orangeBtnClass, editCompanyBtnClass]"
            @click="editCompany($event)">
              Edytuj firmę
            </button>
      
          </div>
        </div>
      </div>

      <div class="c-profile__flex-list">
        <div class="flex-list__item">                   
          <i class="material-icons-sharp checkmark">done</i>
          <p class="main-text">
            obsługiwane sposoby rozliczania:<br/>
          </p>
            <ul class="sublist">
              <li v-if="company.ledger">Księga Przychodów i Rozchodów</li>
              <li v-if="company.lump_sum">Ryczałt</li>
            </ul>
        </div>

        <div class="flex-list__item">                   
          <i class="material-icons-sharp checkmark">done</i>
          <p class="main-text">
            kontakt z księgowym:<br/>
          </p>
            <ul class="sublist">
              <li v-if="company.remote">telefoniczny/online</li>
              <li v-if="company.in_person">osobisty</li>
            </ul>
        </div>

        <div v-if="company.email" class="flex-list__item">                   
          <i class="material-icons-sharp checkmark">done</i>
          <p class="main-text">
            adres e-mail:<br/>
          </p>
            <ul class="sublist">
              <li>{{ company.email }}</li>
            </ul>
        </div>


        <div v-if="company.additional_points" class="flex-list__item">                   
          <i class="material-icons-sharp checkmark">done</i>
          <p class="main-text">
            {{ company.additional_points}}<br/>
          </p>
        </div>

      </div>
  
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        admin: 'admin',
        mtMinusClass: 'mt-minus',
        orangeBtnClass: 'orange-button',
        editCompanyBtnClass: 'edit-company-btn'
      }
    },
    methods: {
      async editCompany() {
        const companyId = this.$route.params.id;
        history.pushState({}, '', `/office/${companyId}?edit=true#edit-form`);
        window.location.reload()
      }
    },
    props: {
      company: Object
    }
  }
</script>