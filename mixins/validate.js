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
        checkForm(form=null,validation=null,errors=null) {
  
            let v = validation ? validation : this.validation;
            let f = form ? form : this.form;
             let e = errors ? errors : this.errors;
      
            v.forEach(k=>{
                if(k.check.includes("required")){
                    if (!f[k.name]) {
                        let label = k.label()+" "+this.l('required', 'g')
                        e.push(label);

                    }
                }else if (k.check.includes("email") && !this.validEmail(f.mail)) { 
                   e.push(this.l('Valid email required','g'));
                }
            })
            
            console.log("e",e)
            if (!e || !e.length) {
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


