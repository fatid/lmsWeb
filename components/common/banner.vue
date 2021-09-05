<template>
    <div>
            	<template v-for="b in filteredBanners"> 
                                <div :key="'bannner'+b.id">
                                    <div class="get1452 box-standart" v-if="b.cbanner_style=='Standart1'"
                                        :style="{background: 'url(' +show_image(b.cbanner_bg,'480','','',90,'','')+')',     backgroundSize: 'cover' }"
                                    >
                                        <h4>{{b.cbanner_title}}</h4>
                                        <p>{{b.cbanner_subtitle}}</p>
                                        <button class="Get_btn" @click.middle="goPathBlank(b.cbanner_buttonurl)" @click="goPath(b.cbanner_buttonurl)">{{b.cbanner_buttontext}}</button>
                                    </div>
                                    
                                    <div class="strttech120 box-standart" 
                                    
                                     :style="{background: 'url(' +show_image(b.cbanner_bg,'480','','',90,'','')+')',     backgroundSize: 'cover' }"
                                    v-else-if="b.cbanner_style=='Centered1'">
                                        <h4>{{b.cbanner_title}}</h4>
                                        <p>{{b.cbanner_subtitle}}</p>
                                        <button class="Get_btn"  @click.middle="goPathBlank(b.cbanner_buttonurl)" @click="goPath(b.cbanner_buttonurl)">{{b.cbanner_buttontext}}</button>
							        </div>
                              </div>
                            </template>

    </div>
</template>

<script>
import general from "@/mixins/general";
 
export default {
    props:{
        area:String
    },
  mixins: [general],
  computed:{
      filteredBanners(){
if(this.banners){
    let auth  = this.$store.state.user.auth;
    return this.banners.filter(k=>{
        let areas = k.cbanner_part ? k.cbanner_part.split("--") : ['.']
        // console.log(this.area,areas,areas.includes(this.area),k.cbanner_who)
        if(areas.includes(this.area)){
            if(k.cbanner_who=='' || k.cbanner_who=='All Users' || (k.cbanner_who=='Members' && auth && auth!=null && auth.token) || (k.cbanner_who=='New Users' && (!auth || auth==null || !auth.token)) ){
                return k;
            }
        }
    })
}else{
    return this.banners
}

      }
  }
}
</script>
<style >
 .box-standart{
                padding: 15px 13px; 
                margin-bottom: 10px;
        }
</style>

