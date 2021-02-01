<template>
  <div class="w-100">
    <div class="container g-my-30">
      <h1 v-if="error.statusCode === 404">Sorry ! </h1>
     <h1 v-else>Page Not Found!</h1>
      <nuxt-link to="/ar/home"> Home </nuxt-link>
      
    </div>
  </div>
</template>

<script>
import headBar from "~/components/common/headBar.vue";
import footerBar from "~/components/common/footer.vue";
export default {
  props: ['error'],
  //layout: 'blog' // you can set a custom layout for the error page
    components: {
    headBar,
    footerBar 
  },
}
</script>
