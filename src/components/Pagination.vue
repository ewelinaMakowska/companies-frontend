<template>
  <div class="pagination__wrapper">
    <div class="pagination" id="pagination">
      <div class="pagination__button-wrapper" v-for="(page) in pages" :key="page">
        <button class="pagination__button" @click="updatePathParams($event)">{{page}}</button>
      </div> 
    </div>  
  </div>
</template>


<script>
  export default {
    props: {
      numberOfPages: {
        type: Number,
      },

    },
    data() {
      return {
        pages : [],
        searchParams: this.$route.query,
      }
    },


    methods: {
      generatePageNumbers() {
        console.log(this.searchParams)
        let currentPage = this.searchParams.page;
        if (!currentPage) {currentPage = 1}
        let oneBefore 
        let twoBefore 
        let oneAfter 
        let twoAfter 
        
        this.pages.push(currentPage)

        oneBefore = currentPage-1
        twoBefore = currentPage-2
        oneAfter = parseInt(currentPage)+1
        twoAfter = parseInt(currentPage)+2

        if(oneBefore > 1) {
          this.pages.unshift(oneBefore)
        }
        if (twoBefore > 1) {
          this.pages.unshift(twoBefore)
        }
        this.pages.push(oneAfter)
        this.pages.push(twoAfter)

        this.pages.unshift(1)
        this.pages.push(this.numberOfPages)

        if(currentPage == 1) {
          this.pages.shift();
        }

        if(Math.abs(currentPage-this.numberOfPages) <= 2) {
          this.pages.pop();
        } 

        if(Math.abs(currentPage-this.numberOfPages) <= 1) {
          this.pages.pop();
        } 

        if(Math.abs(currentPage-this.numberOfPages) == 0) {
          this.pages.pop();
        } 

        this.pages.unshift('prev');

        if(currentPage == 1) {
          this.pages.shift();
        }

        this.pages.push('next')


        if(currentPage == this.numberOfPages) {
          this.pages.pop();
        }      
        //console.log(pages) 
      },
      updatePathParams($event) {
        let url = window.location.href.split('/');
        let path = url[url.length-1].split('?')
        const currentQuery = this.$route.query;  
        let newPage

        console.log($event.target)

        if($event.target.classList.contains('chevron-backward')) {               
          newPage = parseInt(currentQuery.page)-1
          console.log(newPage)
        } else if($event.target.classList.contains('chevron-forward')) {
          console.log($event.target)
          newPage = parseInt(currentQuery.page)+1
          } else {
          newPage = $event.target.innerText;
        }
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

         if(currentQuery.contact) {
          newUrl += `&contact=${currentQuery.contact}`
        } 
      
        if (!currentQuery.page) {
          newUrl += `&page=2`;
        } else {
          currentQuery.page = newPage;
          newUrl += `&page=${newPage}`;
        }
        
        window.location.href = newUrl;
      },
      disableCurrentPageBtn() {
        let pagBtns = document.getElementsByClassName('pagination__button');
        for(let i = 0; i<pagBtns.length; i++) {
          if(this.$route.query.page) {
            if(pagBtns[i].innerText == this.$route.query.page) {
            pagBtns[i].setAttribute('disabled','true')
            pagBtns[i].classList.add('active')
            }
          } else {
            pagBtns[0].setAttribute('disabled','true')
            pagBtns[0].classList.add('active')
          }
        }
      },
      changeTextToIcons() {
        console.log('change text to icons')
        let pagBtns = document.getElementsByClassName('pagination__button');
        let chevronForward = "<i class='material-icons-sharp chevron-forward'>chevron_right</i>"
        let chevronBackward = "<i class='material-icons-sharp chevron-backward'>chevron_left</i>"

        for(let i = 0; i<pagBtns.length; i++) {
         // if(this.$route.query.page) {
            if(pagBtns[i].innerText == 'prev') {
              pagBtns[i].innerHTML = chevronBackward;
              pagBtns[i].classList.add('chevron-backward', 'chevron-btn');
            } else if(pagBtns[i].innerText == 'next') {
              pagBtns[i].innerHTML = chevronForward;
              pagBtns[i].classList.add('chevron-forward', 'chevron-btn');
            }
          }
        //}
    }, 
    },

    computed: {
  
    },
      async created() {
        console.log('pagination created')
        this.generatePageNumbers();
      },
      async mounted() {
        console.log('pagination mounted')
        this.disableCurrentPageBtn()
        this.changeTextToIcons()
      }
  }
</script>
