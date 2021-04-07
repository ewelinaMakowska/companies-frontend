<template>
  <div class="filters">
    <button @click="showBubble('showFiltersBubble')" class="filters__button">
      Filtry
    </button>

    <button @click="showBubble('showSortBubble')" class="filters__button">
      Sortowanie
    </button>

    <div v-if="filtersVisibilitySettings.sort.showBubble" class="filters__bubble filters__bubble--sort sort-options" id="filters__bubble--sort">
        <div class="triangle triangle--sort"></div>
        <button @click="hideBubble('hideSortBubble')" class="bubble__close-btn" id="sort-close-btn">
          <i class="material-icons-sharp filter__icon">cancel</i>   
        </button>

        <p class="filter-name">Cena</p>
        <ul class="filter-list">
          <li>
            <label class="filter__label filter__label--sort" for="price_asc">
              <span class="filter__pseudo-label">rosnąco</span>
              <input class="filter__input" type="radio" id="price_asc" name="price_asc" value="price_asc" @click="setSortParam($event, 'price_asc')">
              <i class="material-icons-sharp filter__icon">expand_less</i>   
            </label>
          </li>

          <li>
            <label class="filter__label filter__label--sort" for="price_desc">
              <span class="filter__pseudo-label">malejąco</span>
              <input class="filter__input" type="radio" id="price_desc" name="price_desc" value="price_desc" @click="setSortParam($event, 'price_desc')">
              <i class="material-icons-sharp filter__icon">expand_more</i>    
            </label>
          </li>
        </ul>

        <p class="filter-name">Nazwa biura</p>
        <ul class="filter-list">
          <li>
            <label class="filter__label filter__label--sort" for="name_asc">
              <span class="filter__pseudo-label">Od A do Z</span>
              <input class="filter__input" type="radio" id="name_asc" name="name_asc" value="name_asc" @click="setSortParam($event, 'name_asc')">
              <i class="material-icons-sharp filter__icon">expand_less</i>  
            </label>
          </li>

          <li>
            <label class="filter__label filter__label--sort" for="name_desc">
              <span class="filter__pseudo-label">Od Z do A</span>
              <input class="filter__input" type="radio" id="name_desc" name="name_desc" value="name_desc" @click="setSortParam($event, 'name_desc')">
              <i class="material-icons-sharp filter__icon">expand_more</i>   
            </label>
          </li>
        </ul>
    </div>


      <div v-if="filtersVisibilitySettings.filters.showBubble" class="filters__bubble filters__bubble--filters filter-options" id="filters__bubble--filters">
        <div class="triangle triangle--filters"></div>
        <button @click="hideBubble('hideFiltersBubble')" class="bubble__close-btn" id="filters-close-btn">
          <i class="material-icons-sharp filter__icon">cancel</i>   
        </button>


      <div class="filter-group">
        <p class="filter-name">Sposób rozliczania</p>
        <ul class="filter-list">
          <li>
            <label class="filter__label filter__label--filters" for="ledger">
              <span class="filter__pseudo-label">Księga Przychodów i Rozchodów</span>
              <input class="filter__input" type="radio" id="ledger" name="ledger" value="ledger" @click="setFilterAccountingMethod($event, 'ledger')">
              <i class="material-icons-sharp filter__icon filter__icon--filters">menu_book</i>
            </label>
          </li>

          <li>
            <label class="filter__label filter__label--filters" for="lump_sum">
              <span class="filter__pseudo-label">Ryczał†</span>
              <input class="filter__input" type="radio" id="lump_sum" name="lump_sum" value="lump_sum" @click="setFilterAccountingMethod($event, 'lump_sum')">
              <i class="material-icons-sharp filter__icon filter__icon--filters">library_books</i>  
            </label>
          </li>
        </ul>
      </div>
        

      <div class="filter-group">
         <p class="filter-name">Kontakt z księgowym</p>
        <ul class="filter-list">
          <li>
            <label class="filter__label filter__label--filters" for="in_person">
              <span class="filter__pseudo-label">Osobisty &nbsp;</span>
              <input class="filter__input" type="radio" id="in_person" name="in_person" value="in_person" @click="setFilterContactMethod($event, 'in_person')">
              <i class="material-icons-sharp filter__icon filter__icon--filters">person_pin_circle</i>   
            </label>
          </li>

          <li>
            <label class="filter__label filter__label--filters" for="remote">
              <span class="filter__pseudo-label">Online/telefonicznie&nbsp;</span>
              <input class="filter__input" type="radio" id="remote" name="remote" value="remote" @click="setFilterContactMethod($event, 'remote')">
              <i class="material-icons-sharp filter__icon filter__icon--filters">wifi</i>    
            </label>
          </li>
        </ul>
      </div>
       
    </div>



 <!--  <div class="filters__bubble filters__bubble--filter filter-options" style="transform: translateX(-163px);
">
     
     Sposób rozliczania
    <ul>
      <li>
        <input type="radio" id="ledger" name="ledger" value="ledger" @click="setFilterAccountingMethod($event, 'ledger')">
        <label for="ledger">Księga Przychodów i Rozchodów</label>
      </li>
       <li>
        <input type="radio" id="lump_sum" name="lump_sum" value="lump_sum" @click="setFilterAccountingMethod($event, 'lump_sum')">
        <label for="lump_sum">Ryczałt</label>
      </li>
    </ul>
    Kontakt z księgowym
    <ul>
      <li>
        <input type="radio" id="in_person" name="in_person" value="in_person" @click="setFilterContactMethod($event, 'in_person')">
        <label for="in_person">Osobiście</label>
      </li>
       <li>
        <input type="radio" id="remote" name="remote" value="remote" @click="setFilterContactMethod($event, 'remote')">
        <label for="remote">Telefonicznie/online</label>
      </li>
    </ul>
    
  </div> -->
   
  </div>
</template>


<script>
export default {
  data() {
    return {
       visible: {
        sort: false,
        filter: false
      } 
    }
  },
  methods: {
    showBubble(whichBubble) {   
      this.$store.dispatch(whichBubble)

      if(whichBubble === 'showSortBubble') {
        this.hideBubble('hideFiltersBubble')
      } else if(whichBubble === 'showFiltersBubble') {
        this.hideBubble('hideSortBubble')
      }
    },

    hideBubble(whichBubble) {
      return this.$store.dispatch(whichBubble)
    },

    hideAllBubbles() {
      this.$store.dispatch('hideFiltersBubble')
      this.$store.dispatch('hideSortBubble')
    },

    setSortParam($event, sortParam) {
      let url = window.location.href.split('/');
      let path = url[url.length-1].split('?')
      const currentQuery = this.$route.query;  
      //let newSortParam = sortParam;

      let newUrl = url[0] + '//' +url[2] + '/' + path[0] + '?'

      if(currentQuery.city) {
        newUrl += `&city=${currentQuery.city}`
      } 

      newUrl += `&sort=${sortParam}`

      if(currentQuery.accounting) {
        newUrl += `&accounting=${currentQuery.accounting}`
      }           

      if(currentQuery.page) {
        newUrl += `&page=1`
      }    
      window.location.href = newUrl;
    },

    setRadiosChecked() {
      const currentQuery = this.$route.query;  
      let radioAccounting;
      let radioSort;

      if(currentQuery.accounting) {
        radioAccounting = document.querySelectorAll(`input[value=${currentQuery.accounting}]`);
        radioAccounting[0].checked = true;
      }

      if(currentQuery.sort) {
        radioSort = document.querySelectorAll(`input[value=${currentQuery.sort}]`);
        radioSort[0].checked = true;
      }
    },

    setFilterAccountingMethod($event, accountingMethod) {
      console.log(accountingMethod);
      $event.target.setAttribute('checked','true');

      let url = window.location.href.split('/');
      let path = url[url.length-1].split('?')
      const currentQuery = this.$route.query;  
      //let newAccountingMethod = accountingMethod;

      let newUrl = url[0] + '//' +url[2] + '/' + path[0] + '?'

      if(currentQuery.city) {
        newUrl += `&city=${currentQuery.city}`
      } 

      if(currentQuery.sort) {
        newUrl += `&sort=${currentQuery.sort}`
      } 
      
      newUrl += `&accounting=${accountingMethod}`

      if(currentQuery.contact) {
        newUrl += `&contact=${currentQuery.contact}`
      } 
      
      //if(currentQuery.page) {
        newUrl += `&page=1`
      //}
    
      window.location.href = newUrl;
    }, 

     setFilterContactMethod($event, contact) {
      console.log(contact);
      $event.target.setAttribute('checked','true');

      let url = window.location.href.split('/');
      let path = url[url.length-1].split('?')
      const currentQuery = this.$route.query;  
      //let newAccountingMethod = accountingMethod;

      let newUrl = url[0] + '//' +url[2] + '/' + path[0] + '?'

      if(currentQuery.city) {
        newUrl += `&city=${currentQuery.city}`
      } 

      if(currentQuery.sort) {
        newUrl += `&sort=${currentQuery.sort}`
      } 

      if(currentQuery.accounting) {
        newUrl += `&accounting=${currentQuery.accounting}`
      } 
      
      newUrl += `&contact=${contact}`
      
      //if(currentQuery.page) {
        newUrl += `&page=1`
      //} 
    
      window.location.href = newUrl;
    }, 
  },
   computed: {
      filtersVisibilitySettings() {
        return this.$store.getters.getFiltersVisibilitySettings;
      }
    },
  async created() {


  },
  mounted(){
    console.log('filters mounted')
    this.hideAllBubbles();
    //this.setRadiosChecked();
    //console.log(this.visible.sort)
}
}
</script>
