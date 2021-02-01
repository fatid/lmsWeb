import axios from 'axios'
export default {
  data() {
    return {};
  },
  computed: {
    topics(){
      return this.$store.state.research.topics
    },
    researchTypes(){
      return this.$store.state.research.researchTypes
    },
  },
  methods:{
    
    getResearchType(rs,value){
      let  found = this.researchTypes.find(k=> rs == k.id);
      if(found && found[value]){
        return found[value];
      }

    },
    getTopics(rs){
      let m = rs.rs_MainT
      let s = rs.rs_SubTopic
      let arr = []
      
      if(s){
        let sp= s.split("---")
        arr=sp
      }
      if(m){
          arr.push(m)
      } 
      return this.topics.filter(element => {
        // console.log(arr.includes(element.id))
        if(arr.includes(element.id)){
          return element
        }
      });
    },
    splitArr(item) {
        if(typeof item == 'string' && item){
          return item.split(",");
        }
    },
  },
  async created(){ 
    let topic = this.$store.state.research.topics
    let researchTypes = this.$store.state.research.researchTypes 
    if(!topic || topic.length<1){ 
     await this.$store.dispatch("research/getTopics",{lang: this.LOCALE})
    }

    if(!researchTypes || researchTypes.length<1){
      await this.$store.dispatch("research/getResearchType",{lang: this.LOCALE})
    }
  }
};
