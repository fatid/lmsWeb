<template>
  <svg class="svgicon" :class="{ 'icon-spin': spin }" v-if="isCustom">
    <use :xlink:href="`${iconPath}`" />
  </svg>
  <i v-else :class="iconPath"></i>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
    
      default: 'fa fa-plus'
    },
    spin: {
      type: Boolean,
      default: false,
    },
  },
  data(){
      return {
          iconPath: '',
          isCustom : false
      }
  },
  created(){
       if(this.icon){
          let icon =this.icon.split("kv-icon-");
          if(icon && icon[1]){
              this.isCustom = true;
              this.iconPath= '#icon-'+icon[1]
          }else{
              this.isCustom = false;
              this.iconPath= this.icon
          }
       }else{
              this.isCustom = false;
              this.iconPath= this.icon
          }
    
  }
}
</script>

<style>
svg.svgicon {
  fill: currentColor;
  height: 1em;
  margin-bottom: 0.125em;
  vertical-align: middle;
  width: 1em;
  transition: .5s all;

}
svg.icon-spin {
  animation: icon-spin 2s infinite linear;
}
.rotated{
  transform: rotate(180deg);
  transition: .5s all;
}
.rotated-45{
  transform: rotate(45deg);
  transition: .5s all;
}
.rotated-90{
  transform: rotate(90deg);
  transition: .5s all;
}
.rotated-145{
  transform: rotate(145deg);
  transition: .5s all;
}
.rotated-225{
  transform: rotate(225deg);
  transition: .5s all;
}
.rotated-270{
  transform: rotate(270deg);
  transition: .5s all;
}
@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
