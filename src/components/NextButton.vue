<template>
  <div class="button">
    <a
      :href="'/search?city='+this.$props.city+'&sort='+this.$route.query.sort+'&page='+(this.currentPageNumber)"
    > next
    </a>
  </div>
</template>

<!-- <style scoped>
.button {
  padding-right: 15px;
}
</style> -->

<script>

export default {
  props: {
    howManyPages: Number,
    city: String
  },
  data () {
    return {
      currentPageNumber: null
    }
  }, // methods
  mounted () {
    this.findNextPageNumber()
  },
  methods: {
    findNextPageNumber () {
      if (this.$route.query.page < this.$props.howManyPages) {
      //  if(this.$route.query.page < 3) {
        return this.currentPageNumber = parseInt(this.$route.query.page) + 1 // eslint-disable-line no-unused-vars
      } else if (!this.$route.query.page) {
        return this.currentPageNumber = 2
      } else {
        console.log(this.$props.howManyPages)
        console.log(this.$route.query.page)
        return this.currentPageNumber = this.$props.howManyPages // eslint-disable-line no-unused-vars
      }
    } // fnpn method end
  } // mounted

}

</script>
