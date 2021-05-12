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
														v-model="search"
														@blur="goPath('page/help/all',{search:search})"
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
        <div class="_215b17">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="course_tab_content">
							<div class="tab-content" id="nav-tabContent">
								<div class="tab-pane fade show active" id="nav-instructor" role="tabpanel">
									<div class="tpc152">
										<div class="crse_content">
											<h3>{{l('Select a topic to search for help','g')}}</h3>																			
										</div>
										<div class="section3126 mt-20" v-if="options && options['SSS_Kategori']">
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
</template>

<script>
import general from "@/mixins/general";

export default {
	layout: 'basic',
	mixins:[general],
	data(){
		return{ 
			search:''
		}
	},
	
	 async created() {
				await this.$store.dispatch("core/getOptions", {
						slang: this.$store.state.locale,
						group: "SSS_Kategori",
						fields: "id,faqc_Title,faqc_Icon,faqc_short"
				});
	 }
}
</script>