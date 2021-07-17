import axios from 'axios';

export default {
    
    data(){
        return {
            form: {
                name: "",
                surname: "",
                mobile: "",
                email: "",
                subject: "",
                message: ""
              },
              error: [],
        }
    },
    computed: {
        sended(){
            return  this.$store.state.form.form;
          },
   
        isMobile() {
            return this.$route.query.device
              ? this.$route.query.device
              : this.$device.isMobile;
        } 
    },

    methods:{
        
        async lf(files) {
            let fromVuex = this.$store.state.langFile;
            let lang = this.$store.state.locale;
            var main = fromVuex 
            let allFiles = ["main",'g'] 
            await files.forEach(async fi => {
                if (fi!='g' && allFiles.includes(fi)) {
                    if (typeof fromVuex !="undefined" && !fromVuex[fi]) { 
                        let fix = require(`@/locale/` + lang + `/` + fi + `.js`);
               
                        Object.assign(main,fix);
                    }else{ 
                        // main[fi] = { ...fromVuex[fi] };
                    }
                }else if (fi=='g') {
                    if (typeof fromVuex !="undefined" && !fromVuex[fi]) { 
                    await axios({
                        url: process.env.baseURLFile+'lan/'+lang+'/general',
                        method: "get" 
                      })
                        .then(response => {

                            Object.assign(main,{g:response.data});
                            this.$store.commit("setLangFile",{...main});
                        })
                        .catch(e => {
                          console.log("ERR", e);
                        });
                    }
                }
            }); 
            return main;
        },


        jopen(src){
            jQuery.fancybox.open({
                src,  type: 'iframe',   helpers: { overlay: { locked: false } },  
                opts : { iframe : {width:'98%', height:630, background:'#fff',padding: 10, scrolling : 'yes'} }		  
            });
        },
        text_minimize(text,size){
            let t = text.substr(0,size).split(' ');
            let add = text.length>size ? "...":"";
            if(add!=""){    t.pop();  }
            return t.join(" ")+add;
        },
        async postNote() { 
            try {
              const token = await this.$recaptcha.getResponse()
            
          this.$validator.validate().then(valid => {
              if (!valid) {
                 console.log('Formda eksik bilgi var')
              }else{
                  this.$store.dispatch("form/formSubmit", {
                    form: this.form,
                    pageData: this.pageData,
                  }).then(response => {
                    //this.sended = this.$store.state.form.form;
                  
                    $('#modalAlert').modal('show');
                     
                    for (var key in this.form ) {
                       this.form[key] = ''
                    }
                  }).catch(err => {
                    $('#modalAlert').modal('show');
                  });
              }
              });
          }catch (error) {
              console.log('Login error:', error)
            }
        },

        getColorTour(type,sure){
            return sure<=9?'themecolor1':sure>9 && sure<=12 ? 'g-bg-orange':sure>12 ? 'g-bg-green': 'themecolor3';
        }
    }

}