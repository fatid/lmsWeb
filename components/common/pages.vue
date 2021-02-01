<template>
    <div class="container" 
    :class="isMobile ? 'py-5 my-5' : 'py-2 my-2'">
			 
					<div class="row row-gutter-sm mb-5 ">
						<div v-for="dt in data" class="col-6  col-lg-4 text-center mb-4 ">
							<a  @click="goPath('page/'+dt.SA_Link)" class="text-decoration-none">
								<div class="custom-thumb-info-style-1 thumb-info thumb-info-no-borders thumb-info-no-borders-rounded thumb-info-lighten">
									<div class="thumb-info-wrapper-page">
										<img :src="dt.SA_Fotograf" class="img-fluid" alt="">
									</div>
									<h3 class="text-transform-none font-weight-bold text-3 mt-2 mb-0">{{dt.SA_Baslik}}</h3>
								</div>
							</a>
						</div>  
					</div>
				
				</div>
</template>
<script>

import general from "@/mixins/general";
import axios from "axios";

export default {
 mixins: [general], 
 data: () => ({ 
    data:[]
 }),
 props:{
      pageId: [Number,String]
 },
 created() { 
    this.getHeaderData();
  },
  watch:{
      'pageInfo.id'(val){
           this.getHeaderData();
      }
  },
  methods:{
    
    async getHeaderData() { 
       let fields = `SA_Title,SA_Description,SA_Keywords,SA_Baslik,id,status,SA_Link,SA_Fotograf,created_on,created_by,id,status`
         
                let filters= { status:['=',1], SA_UstSayfa:['=', this.pageId]}
                return new Promise((resolve, reject) => {
                axios({
                    url: process.env.baseURL+"KurumsalSayfalar",
                    method: 'get',
                    params: {
                        limit:20,
                        offset:0,
                        fields,
                        lang:this.$store.state.locale,
                        sort:['pdb_sira,DESC'],
                        filter:filters
                    }  
                }).then(response => {
                        this.data = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData:  [];
                    console.log("slider",this.data)
       
                }).catch(e => {
                    console.log(e)
                    })
                });
    }
  },
}
</script>
<style>

@media (min-width: 992px){
    .thumb-info-wrapper-page{
        min-width: 100%;
        height: 150px;
    }
 
.thumb-info-wrapper-page img{
    width: auto;
    height: 150px;
}
}

@media (max-width: 991px){
    .thumb-info-wrapper-page{
        width: 100%;
        height: 130px;
        overflow: hidden;
        text-align: center;
    }
 
.thumb-info-wrapper-page img{
    min-width: 100%;
    height: 130px;
        width: auto;
        max-width: none;

}
}


.sp_h2{
  font-size: 28px;
  font-weight: 600;
}
.sp_area{
  
} 

.sp_area .sp_title{
  font-size: 14px; 
  font-weight: bold; 
} 
.sp_area .sp_title span{
  font-size: 14px;  
  background: #000;
  color: #fff;
  padding: 3px 5px;
} 
</style>