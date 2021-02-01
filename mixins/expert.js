import axios from 'axios'
export default {
  data() {
    return {};
  },
  computed: {
    expCats(){
      return this.$store.state.expert.expCat
    },
    expAreaofInts(){
      return this.$store.state.expert.expAreaofInt
    },
    experts(){
      return this.$store.state.expert.experts
    },
  },
  methods:{
    
      getExpAreaofInts(rs,value){
          if(rs){
        let  arr = rs.split("---");
        
        return this.expAreaofInts.filter(element => {
            // console.log(arr.includes(element.id))
            if(arr.includes(element.id)){
              return element
            }
          });
        }
      },
      getExp_Area(rs){
        let m = rs.exp_Area
        let s = rs.exp_Sub
        let arr = []
        
        if(s){
          let sp= s.split("---")
          arr=sp
        }
        if(m){
            arr.push(m)
        } 
        return this.expCats.filter(element => {
          // console.log(arr.includes(element.id))
          if(arr.includes(element.id)){
            return element
          }
        });
      },
  }
}


