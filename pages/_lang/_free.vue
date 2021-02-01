<template>
<div class="container">
    <div class="row">

 <div class="col" >
     <div style="width:200px;">Sidebar {{LOCALE}} </div>
     </div>
 <div class="col-auto">Panel</div>

    </div>
</div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: { 
  },
  computed: {
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    LOCALE(){
          return this.$store.state.locale;
      },
    LANG_PACK(){
          return this.$store.state.langFile;
      }
  },
}
</script>
