<template>
  <div class="thumbs__thumb animate__animated animate__fadeIn">
    <div class="thumb__top">
      <div class="top__left">
        <img src="/assets/img/dummy-logo.svg" class="thumb__logo" alt="company logo" />
      </div>
      <div class="top__right">   
           
        <ul class="thumb__list">
          <li class="thumb__name">{{ name }}</li>

          <li class="thumb__city">
            <i class="material-icons-sharp checkmark thumb__icon">place</i>
            <span class="thumb__city-wrapper">{{ city }}</span>
          </li>

          <li class="thumb__price">
            <i class="material-icons-sharp checkmark thumb__icon">local_offer</i>
            {{ price }} zł/msc
          </li>
        </ul>

      </div>
    </div>

    <div class="thumb__bottom">
      <p class="thumb__description">{{ description }}</p>

   
    </div>

     <router-link :to="'/office/' + office.id" class="thumb__button">
        Więcej
     </router-link> 
 


  </div>
</template>



<script>
  export default {
    props: {
      office: Object,
      name: String,
      city: String,
      description: String,
      id: Number,
      price: Number
    }
  }
</script>
