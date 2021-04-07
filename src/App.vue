<template>
  <div>
    <transition name="router-anim" enter-active-class="animate__animated animate__fadeIn">
    <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  })
}
</script>
