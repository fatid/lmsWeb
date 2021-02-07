<template>
  <div role="main" class="main"> 
        <examHome></examHome> 
        <dictionaryHome></dictionaryHome> 

        <!-- <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul> -->
  </div>
</template>

<script> 


export default { 
  components: {   
    dictionaryHome: ()=> import("~/components/home/dictionaryHome"), 
    examHome: ()=> import("~/components/home/examsHome"), 
  },
  layout(context) {
    return "default";
  }
};
</script>
