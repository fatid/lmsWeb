import axios from 'axios';

export default {
    
    data(){
        return{
            errors:[]
        }
    },
    computed:{
        formResult: {
            get() {
              return this.$store.state.form.result;
            },
            set(val) {
              this.$store.state.form.result = val;
            }
          }
    },
    methods:{
        formResultClose() {
            this.$store.commit("form/restoreResult", { show: false });
          },
        checkForm() {
            this.errors = [];
            let v = this.validation;
            v.forEach(k=>{
                if(k.check.includes("required")){
                    if (!this.form[k.name]) {
                        let label = k.label()+" "+this.l('required', 'g')
                        this.errors.push(label);

                    }
                }else if (k.check.includes("email") && !this.validEmail(this.form.mail)) { 
                    this.errors.push(this.l('Valid email required','g'));
                }
            })
            
      
            if (!this.errors.length) {
              return true;
            }
      
            // e.preventDefault();
          }, 
     
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          },
    }
}


