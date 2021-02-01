<template>
  <div role="main" class="main"> 
        <dictionaryHome></dictionaryHome> 
  </div>
</template>

<script> 


export default { 
  components: {   
    dictionaryHome: ()=> import("~/components/home/dictionaryHome"), 
  },
  layout(context) {
    return "default";
  }
};
</script>
