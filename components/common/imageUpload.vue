<template>
   <div Upload Image </div>
</template>
<script>
import moment from "moment";
 
export default {
 
    props:{
 
        project: Number
    },
    data(){
        return{
            filters:{
                keyword: ''
            },
            fileList:[],
            dialog: true,
            data:[],
            total: 0,
            selected:null,
            tab:'project', 
        }
    },
    created(){
        this.getResults()
    },
    computed:{
        projectId() {
                    return this.$route.params.id;
        },
        mappedParameters() {
             const params = {
                filters: {
                // offset: 0,
                // limit: this.filters.limit
                },
            };
         
            if (this.filters.accountName) {
                params.filters.account_name = ["=", this.this.filters.accountName];
            }
            if (this.projectId) {
                params.filters.project = ["=", this.projectId];
            }
            // if (this.selectedCategory) {
            //     params.filters.category = ["=", this.selectedCategory];
            // }
            if (this.filters.keyword) {
                params.keyword = this.filters.keyword;
            }
            if (this.filters.sort) {
                const parsed = this.filters.sort.split(":");
                params.sort = parsed[0];
                params.dir = parsed[1];
            }
            return params;
        },
    },
    methods:{

        handleUploadFiles () {
        // const $files = this.$refs.files
        // const data= {
        //     category:null,
        //     project:this.projectId,

        // }

        // const formData = new FormData()
        // data.category = Array.isArray(data.category) ? data.category[data.category.length - 1] : data.category

        // formData.append('appData', JSON.stringify({
        //   appId: 'dm',
        //   modelId: 'document',
        //   documentFieldId: 'document_file',
        //   documentNameFieldId: 'document_name'
        // }))

        // formData.append('data', JSON.stringify(data))
        // $files.uploadFiles.forEach(file => {
        //   formData.append('file[]', file.raw)
        // })
        // this.loading = true
     
      },
        setImage(){
            this.$emit('setImage',this.selected)
        },
        closeDilaog(){
            // this.dialog = false;
            this.$emit('close',true)
        },
getRecord(id) {
            
        },
        getResults() {
          
        },
 
    }
}
</script>
<style lang="scss">
.container-dialog{
    height: 300px;
    width: 100%;
    overflow: auto;
    overflow-x: hidden;
}       
.search-icon{
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor:pointer;
    z-index:11;
}
.image-item{
    margin-bottom: 10px;
    position: relative;
    .objectFitUpload{
        width: auto; 
  height: 80px;
  width: 100%;
 text-align: center;
  cursor: pointer;
  display: block;
}
.selected{
    background: #7c9a74;
    color: #fff;
}

    }

</style>