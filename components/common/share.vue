<template>
     <div class="g-mb-30">
              <ul class="list-inline text-uppercase mb-0 flex-row">
                 
                <li class="list-inline-item g-mr-10">
                  <a
                    class="btn u-btn-facebook g-font-size-12 rounded g-py-10"
                    :href="'https://www.facebook.com/sharer/sharer.php?u='+url+'&amp;src=sdkpreparse'"
                  >
                    <i class="fab fa-facebook" :class="textShow ? 'g-mr-5--sm':''"></i>
                    <span class="hidden-xs-down"  v-if="textShow">Share on Facebook</span>
                  </a>
                </li>
                <li class="list-inline-item g-mr-10">
                  <a
                    class="btn u-btn-twitter g-font-size-12 rounded g-py-10"
                    :href="'http://twitter.com/share?text='+pageInfo.SA_Baslik+'&amp;url='+url+'&amp;hashtags='"
                  >
                    <i class="fab fa-twitter " :class="textShow ? 'g-mr-5--sm':''"></i>
                    <span class="hidden-xs-down" v-if="textShow">Tweet on Twitter</span>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    class="btn u-btn-lightred g-font-size-12 rounded g-py-10"
                    :href="'http://pinterest.com/pin/create/button/?url='+url+'&amp;media='+pageInfo.SA_Fotograf+'&amp;description='+pageInfo.SA_Baslik"
                  >
                    <i class="fab fa-pinterest"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    class="btn u-btn-whatsapp g-font-size-12 rounded g-py-10"
                    :href="'whatsapp://send?text='+url+' '+pageInfo.SA_Baslik"
                  > 
                    <i class="fab fa-whatsapp"></i>
                  </a>
                </li>
              </ul>
            </div>
</template>
<script>
export default {
    data(){
        return{
            url : window.location.origin+window.location.pathname
        }
    },
    props:{
      textShow:{
        type:Boolean,
        default: true
      }
    },
    computed: {
        pageInfo() {
          return this.$store.state.pages.pageData;
        }
    }

}
</script>