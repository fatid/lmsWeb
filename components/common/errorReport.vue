<template>
<div id="myModal" class="modal" :class="isVisible ? 'visible' : ''" >
  <div class="modal-content modal-content-wide" >
    <div class="modal-header">
      <span class="close"  @click="isVisible=false" >&times;</span>
      <h4>{{l('Contact us','g')}}</h4>
    </div>
    <div class="modal-body " style="height:calc(100% -150px);">
  <div :lang="LOCALE">
    <div class="container">
      <div class="row"> 
        <div class="col" :lang="LOCALE" :class="customClass.textDir">
          <div
            class="full-width context-menu-form"
            :class="customClass.textDir"
          >
            <!-- Teal Alert -->
            
            <div
              v-if="formResult.show"
              class="alert alert-dismissible fade show g-bg-teal g-color-white rounded-0"
              role="alert"
            >
              <button
                type="button"
                class="close u-alert-close--light"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span @click="formResultClose()">×</span>
              </button>

              <div class="media">
                <span class="d-flex g-mr-10 g-mt-5">
                  <i class="icon-check g-font-size-25"></i>
                </span>
                <span class="media-body align-self-center">
                  <strong>{{ l(formResult.title, "g") }}</strong>
                  {{ l(formResult.message, "g") }}
                </span>
              </div>
            </div>

            <div class=" ui form" id="LetUsContact " action="" method="POST">
               
              <div class="form-group row" :class="customClass.flexRow">
<div class="form-group col-12 ">
                 <p v-if="errors.length" class="errors">
                <b>{{l('Please correct the following error(s):','g')}}</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </p>
</div>
                <div class="form-group col-12 col-md-4">
                  <label class="col-sm-12 col-form-label" for="name">{{
                    l("Name", "g")
                  }}</label>
                  <div class="col-sm-12">
                    <input
                      type="text" 
                      @blur="checkForm()"
                      :placeholder="l('Name', 'g')"
                      class="form-group g-py-15  form-control"
                      style=""
                      :class="customClass.textDir"
                      data-validation="required"
                      v-model="form.name"
                    />
                  </div>
                </div>
                <div class="form-group col-12 col-md-4">
                  <label class="col-sm-12 col-form-label" for="mail"
                    >{{ l("E-mail", "g") }}
                  </label>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      id="mail"
                      name="mail"
                      @blur="checkForm()"

                      :placeholder="l('E-mail', 'g')"
                      class="form-group g-py-15  form-control"
                      style=""
                      :class="customClass.textDir"
                      data-validation="email"
                      v-model="form.mail"
                    />
                  </div>
                </div>
              
              </div>
              <div class="form-group row">
                <div class="form-group col-12">
                  <label class="col-sm-2 col-form-label">{{
                    l("Message", "g")
                  }}</label>
                  <div class="col-sm-10">
                    <textarea
                      data-validation="required"
                      id="message"
                      name="message"
                      @blur="checkForm()"

                      :class="customClass.textDir"
                      style=""
                      class="form-control"
                      v-model="form.message"
                    ></textarea>
                  </div>
                </div>
              </div> 

              <div class="modal-footer">

                   <button
                      type="submit"
                      id="submit-button"
                      style=""
                      @click="submit()"
                      class="btn btn-lg u-btn-outline-primary g-font-weight-600 g-letter-spacing-0_5 text-uppercase g-brd-3 rounded-0 g-mr-10 g-mb-15"
                    >
                      {{ l("Submit", "g") }}
                    </button>
       <a class="btn btn-primary"
        @click="isVisible=false"
       >{{l('Close','g')}}</a>
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
import validate from "@/mixins/validate";

export default {
  mixins: [general,validate],
  components: {},
  data() {
    return {
      form: {
        message: "",
        mail: "",
        name: "",
        department: ""
      }, 
      validation:[
        {name:'name',label: ()=> this.l('Name','g'),check:['required']},
        {name:'message',label: ()=>this.l('Message','g'),check:['required']},
        {name:'mail',label: ()=> this.l('E-mail','g'),check:['required','email']},
      ]
    };
  },
  methods: {
    submit() {
      if(this.checkForm()){
          this.$store.dispatch("form/formSubmit", {
            form: this.form,
            pageData: this.pageInfo
          });
          this.form = {
            message: "",
            mail: "",
            name: "",
            department: ""
          };
      }
    },
  },
  computed: {
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    LOCALE() {
      return this.$store.state.locale;
    },
    LANG_PACK() {
      return this.$store.state.langFile;
    },
    isVisible:{
        get(){
          return this.$store.state.isErrorReportVisible;
        },
        set(val){
          this.$store.state.isErrorReportVisible=val;
        }
      },
    // formResult: {
    //   get() {
    //     return this.$store.state.form.result;
    //   },
    //   set(val) {
    //     this.$store.state.form.result = val;
    //   }
    // }
  }
};  
</script>
<style scoped>
.context-menu-form {
  background: #efefef;
  padding: 12px;
}
</style>

