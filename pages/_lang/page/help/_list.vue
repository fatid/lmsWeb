<template>
<div>
    <div class="_215v12">
			<div class="container-fluid">			
				<div class="row">
					<div class="col-lg-12">
						<div class="section3125">							
							<div class="row justify-content-md-center">						
								<div class="col-md-6">					
									<div class="help_stitle">					
										<h2>How may we help you?</h2>
										<div class="explore_search">
											<div class="ui search focus">
												<div class="ui left icon input swdh11">
													<input class="prompt srch_explore" type="text" 
														v-model="searchText"
                                                        ref="searchKeyword"
                                                        @keyup="getFaq()"
														:placeholder="l('Search for solutions','g')">
													<i class="uil uil-search-alt icon icon2"></i>
												</div>
											</div>
										</div>
									</div>															
								</div>															
							</div>							
						</div>							
					</div>															
				</div>
			</div>
		</div>
      
				<div class="row">

                    <div class="col-lg-3 col-md-5">
						<div class="fcrse_3 frc123">
							<div class="cater_ttle">
								<h4>Topics</h4>
							</div>
							<ul class="allcate15">
								<li v-for="item in options['SSS_Kategori']">
                                    <a    @click="goPath('page/help/'+item.id)"  class="ct_item"
                                        :class="item.id == $route.params.list ? 'active':''"
                                    >
                                    <i :class="item.faqc_Icon ? 'fa '+item.faqc_Icon : 'uil uil-arrow'"></i>
                                    {{item.faqc_Title}}</a></li>
						 		</ul>
						</div>
					 
						<a href="#" @click="$store.state.isErrorReportVisible=true"  class="rqst152">Submit A Request</a>
					</div>
					<div class="col-lg-9">
					 
									<div class="tpc152 mt-10">
									 

                                        <div class="accordion" role="tablist">
                                                <b-card no-body class="mb-1" v-for="item in list">
                                                        <b-card-header header-tag="header" class="pa-10" role="tab">
                                                               <a  v-b-toggle="'accordion-'+item.id" > {{item.faq_Question}}</a>
                                                        </b-card-header>
                                                        <b-collapse :id="'accordion-'+item.id" visible accordion="my-accordion" role="tabpanel">
                                                            <b-card-body>
                                                                 <b-card-text  v-html="HtmlEncode(item.faq_answer)" > </b-card-text>
                                                            </b-card-body>
                                                        </b-collapse>
                                                </b-card>
                                        </div>

										<!-- <div class="section3126 mt-20" v-if="options && options['SSS_Kategori']">
											<div class="row">
												<div class="col-md-4" v-for="item in options['SSS_Kategori']">
													<a href="#" @click="goPath('page/help/'+item.id)" class="value_props50">
														<div class="value_icon">
															<i class="fa" :class="item.faqc_Icon"></i>
														</div>
														<div class="value_content">
															<h4>{{item.faqc_Title}}</h4>
															<p>{{item.faqc_short}}</p>
														</div>
													</a>
												</div> 
											</div>
										</div> -->
									</div> 
								</div> 							
							</div>
						</div>
					 
</template>

<script>
import general from "@/mixins/general";
import axios from "axios";

export default {
	mixins:[general],
    layout: 'default',
	data(){
		return{ 
            searchText: '',
            list:[]
		}
	},
    methods:{
		async getFaq() {
					let fields = `faq_Question,faq_answer,faq_cat,id,status,created_on,created_by`; 
                    if(this.searchText=="" && this.$route.query.search){
                        this.searchText = this.$route.query.search;
                        this.$refs['searchKeyword'].focus();
                    }
					let filters = { status: ["=", 1],faq_Question:['LIKE', this.searchText] };
                    
                    if(this.$route.params.list && this.$route.params.list!="all"){
                        filters.faq_cat = ["=", this.$route.params.list]
                    }

					return new Promise((resolve, reject) => {
						axios({
						url: process.env.baseURL + "SSS_Sorular",
						method: "get",
						params: {
							limit: 100,
							offset: 0,
							fields,
							lang: this.$store.state.locale,
							sort: ["sort,ASC"],
							filter: filters
						}
						})
						.then(response => {
							if (
							response.data &&
							response.data.formattedData &&
							response.data.formattedData[0]
							) {
							let d = response.data.formattedData;
							this.list = d;
							} else {
							this.list = {};
							}
						})
						.catch(e => {
							this.list = {};
							console.log(e);
						});
					});
					},
	},
	 async created() {
                this.getFaq();
				await this.$store.dispatch("core/getOptions", {
						slang: this.$store.state.locale,
						group: "SSS_Kategori",
						fields: "id,faqc_Title,faqc_Icon,faqc_short"
				});
	 },
        
}
</script>