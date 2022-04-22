import axios from 'axios'
// import { find } from '../../api/api1/structure';
export default {
  data() {
    return { 
      willRemove:null
    };
  },
  computed: {
    banners(){
      return  this.$store.state.core.banners;
    },
    options() { 
      return this.$store.state.core.options
    },
    pageInfo() {
      return this.$store.state.pages.pageData;
    },
    resultForm() {
      return this.$store.state.form.result;
    },
    LOCALE() {
      return this.$store.state.locale;
    },
    LANG_PACK() {
      return this.$store.state.langFile;
    },
    customClass() {
      return this.$store.state.customClass;
    },
    likes(){
      return this.$store.state.likes
    },
    isMobile() {
      return this.$route.query.device
        ? this.$route.query.device
        : this.$device.isMobile;
     },  
     likeModal:{
      get(){
        return this.$store.state.likeModal;
      },
      set(val){
        this.$store.state.likeModal=val;
      }
    },
     commentModal:{
      get(){
        return this.$store.state.commentModal;
      },
      set(val){
        this.$store.state.commentModal=val;
      }
    },
	reverseClass(){
	 return this.LOCALE=='ar' ? ' flex-row-reverse' : ''
	}
  },
  methods:{
    removeLikeModal(selected,topModuleData,type){
     
      let f = this.likes.filter((k,i)=>  k.id!=selected.id ); 
      f = JSON.stringify(f) 
      this.$store.dispatch('removeLikes',{items:f,selected});

    },
    openLikeModal(selected,topModuleData,type){
      
      let datax={
        ...selected, 
        type,
        topModuleData:topModuleData
      }
      this.likeModal.data = datax;
      this.likeModal.type = type;
      this.likeModal.show = true;  
      
    },
    openCommentModal(selected,topModuleData,module){
      
      let datax={
        ...selected, 
        module,
        topModuleData:topModuleData
      }
      this.commentModal.data = datax;
      this.commentModal.module = module;
      this.commentModal.show = true;  
      
    },
	
	getRefCode(){
		let  u =  this.$store.state.user.auth;
		let ref = u && u.id ? u.id.replace('uye_','DRF') : ''; 
		return ref;
	},
    openLikeModalAll(selected,topModuleData,type){
      
      let datax={
        all:selected, 
        type,
        topModuleData:topModuleData
      }
      this.likeModal.data = datax;
      this.likeModal.type = type;
      this.likeModal.show = true;  
      
    },
    showPhone(phone){
      let l = phone ? phone.length : 0 ;
      if(l && l==12){
          let arr = ['+',phone.substr(0,2), phone.substr(2,3),phone.substr(5,3),phone.substr(8,2),phone.substr(10,2)]
          return arr.join(" ")
      }else
      if(l && l==11){
          let arr = [phone.substr(0,4),phone.substr(4,3),phone.substr(7,2),phone.substr(9,2)]
          return arr.join(" ")
      }else
      if(l && l==10){
          let arr = [phone.substr(0,3),phone.substr(3,3),phone.substr(6,2),phone.substr(8,2)]
          return arr.join(" ")
      }
  },
    dirClass(type,dir){
      if(type=='float' && dir=="right"){  return this.LOCALE=='ar' ? 'pullLeft' : 'pullRight';  }else
      if(type=='float' && dir=="left"){  return this.LOCALE=='ar' ? 'pullRight' : 'pullLeft';  }else
      if(type=='dir' && dir=="right"){  return this.LOCALE=='ar' ? 'dirLeft' : 'dirRight';  }else
      if(type=='dir' && dir=="left"){  return this.LOCALE=='ar' ? 'dirRight' : 'dirLeft';  }else
      if(type=='align' && dir=="right"){  return this.LOCALE=='ar' ? 'alignLeft' : 'alignRight';  }else
      if(type=='align' && dir=="left"){  return this.LOCALE=='ar' ? 'alignRight' : 'alignLeft';  }
    },
    decodeHtml(html) {
   
     let  htmlx = html.split("../../yonetim/images/")
      html = htmlx.join(process.env.basePathFile)
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    removeTagHtml(html) {
      var tmp = document.createElement("DIV");
          tmp.innerHTML = this.decodeHtml(html);
          return tmp.textContent || tmp.innerText || "";
    },
    getPath(path){
        return '/'+this.LOCALE+'/'+path
    },
    hasGallery(path){

      let files = path ? JSON.parse(path) : []
      if(files && files[0]){
        return true
      }else  if(files && files[1]){
        return true
      }
      return false
    },
    getVideoPath(video){
      if(video){
        return video.replace("/visual/","/")
      }
    },
    show_image(i, w, h, c, q, sa, nup) {
      if(i){
          let imp = i.split(".");
          let total_point = imp.length-1;
          let ext = imp[total_point];
          delete imp[total_point];
          let im = imp.join(".").slice(0, -1);


          let imaj = im;
          h > 0 ? imaj += '_wih_' + h : '';
          w > 0 ? imaj += '_wiw_' + w : '';
          c != "" ? imaj += '_wic_crop-to-fit' : '';
          q > 0 ? imaj += '_wiq_' + q : '';
          sa == "jpg" || sa == "png" || sa == "gif" ? imaj += '_wisa_' + sa : '';
          nup == "no-upscale" ? imaj += '_' + nup : '';

          imaj += '_.' + ext;
          imaj = imaj.replace("/visual/","/visual2/")
          return imaj;
      }
},
    getImages(path,thumb='h=200'){
        let files = path ? JSON.parse(path) : []
        if(files && files[0]){
          files.map(k=>{
              let ret = {}
              
              k.i = process.env.basePathFileVisual +'/yonetim/' + k.i
              k.m = process.env.basePathFileVisual +'/yonetim/' + k.i+'?'+thumb
              return k;
          })
        }
        else if(files && files[1]){
          let keys = Object.keys(files)
          let res= []
          keys.forEach(k=>{
              let ret = {} 
              ret.t =  files[k].t
              ret.i = process.env.basePathFileVisual +'/yonetim/' + files[k].i
              ret.m = process.env.basePathFileVisual +'/yonetim/' + files[k].i+'?'+thumb
              res.push(ret)
              
          })
          return res
        }
        return files
    },
    getMenu(type){
      let menu = this.l('menu','g');
      return menu[type];
    },
    changeLanguage(lang){ 
     
      let p = this.$route.path.slice(4)
      this.$router.push({path:'/'+lang+'/'+p, query:this.$route.query})
      this.collapse = false;
      this.$store.state.locale = lang;
      setTimeout(() => {
        this.$router.go();
      }, 500);     
      
    },
    goPath(path,query={}){ 
      this.$router.push({path:'/'+this.LOCALE+'/'+path,query})
      this.collapse = false;
    },
    hrefPath(path,query={}){ 
      return '/'+this.LOCALE+'/'+path
    },
    goPathBlank(path,query={}){ 
      let href = this.$router.resolve({path:'/'+this.LOCALE+'/'+path,query})
      this.collapse = false;
      window.open(href.href, '_blank');
    },
    l(key,cat='main'){
      if(key){
        let keySplit = key.split(".")
        if(this.LANG_PACK && this.LANG_PACK[cat]){
            let m = this.LANG_PACK[cat];
            if(m[key]) return m[key]  
            if(keySplit[2] && m[keySplit[0]] && m[keySplit[0]][keySplit[1]] && m[keySplit[0]][keySplit[1]][keySplit[2]]) return m[keySplit[0]][keySplit[1]][keySplit[2]]
            if(keySplit[1] && m[keySplit[0]] && m[keySplit[0]][keySplit[1]]) return m[keySplit[0]][keySplit[1]]
        } 
      }
        return key
    },
    basePhoto(photo){
      return process.env.baseURL+"/visual/"+photo
    },
    getCatNameDirect(value,cat){
      let t = this.l("cat."+cat+".list",'g');
      if(t[value]){
        return t[value].name
      }
    },
    getCatName(value,cat){
      let t = this.l("cat."+cat+".list",'g');
      if(value){
          let lg = value.split('---');
          let rt ="";
          let count = 1;
          lg.forEach(element => {
            if(count>1){ rt += ","  }

            if(element && t[element]){
              rt += t[element].name;
            }else{
              rt += element;
            }
            
            count++;
          });
          return rt
      }
    },
    HtmlEncode(s)
    {
      // var el = document.createElement("div");
	  console.log("s",s);
      if(s &&  s!='' && s!=null && typeof s == 'string'){
          s = s.replaceAll("&lt;", "<");
          s = s.replaceAll("&gt;", ">");
          s = s.replaceAll("&quot;", "\"");
          s = s.replaceAll("&#039;", "'");
      }
      return s;
    },
    getLanguage(language){
      let t = this.l("cat.Languages.list",'g');
      let lg = language.split('---');
      let rt ="";
      let count = 1;
      lg.forEach(element => {
        if(count>1){ rt += ","  }

        if(element && t[element]){
          rt += t[element].name;
        }else{
          rt += element;
        }
        
        count++;
      });
      return rt
    },
    async downloadFile(ops){
      let downloaded = localStorage.getItem("downloaded");
      let list = []
      if(downloaded && downloaded.charAt(0)=="["){
          list = JSON.parse(downloaded);
      } 
      if(list.find(k=> k.down_content==ops.id)){
        // console.log("Visited before")
        window.open(ops.link);

      }else{

          if(this.totals && this.totals.download && this.totals.download.id ){ 
              let donw_count = this.totals.download.donw_count + 1;
              await axios({
                url: process.env.baseURL+"wDownloads/"+this.totals.download.id,
                method: 'PUT',
                data: { 
                  donw_count
                }  
              }).then(response => {
                list.push({
                  down_content:ops.id,
                  down_link: ops.link,
                  donw_type: ops.type,
                  date:Date.now()
                })
                window.localStorage.setItem("downloaded", JSON.stringify(list));

                window.open(ops.link);
              }).catch(e => {
                console.log(e)
              })
          }else {         
              await axios({
                url: process.env.baseURL+"wDownloads",
                method: 'POST',
                data: { 
                  donw_count:1,
                  down_content:ops.id,
                  down_link: ops.link,
                  donw_type: ops.type,
                  status:1
                }  
              }).then(response => {
                window.open(ops.link);
              }).catch(e => {
                console.log(e)
              })
          } 
        }
    },
    downloadCount(data,ops){  
        axios({
          url: process.env.baseURL+"wDownloads",
          method: 'get',
          params: {
              limit:1,
              offset:0, 
              filter:{down_link:["=",ops.file],donw_type:["=",ops.type],down_content:["=",ops.id]},
              fields:'donw_count,id', 
          }  
        }).then(response => {
             data = response.data && response.data.formattedData && response.data.formattedData[0] ? response.data.formattedData[0] : 0
             this.totals.download = data;
        }).catch(e => {
           console.log(e)
          })   
    },
    setLikes(item){
      this.$store.dispatch('setLikes',item);
    },
    removeLikes(selected){
 
      let f = this.likes.filter((k,i)=>  k.id!=selected );

      f = JSON.stringify(f) 
      this.$store.dispatch('setLikesFirst',f)
    },
    getLikes() {
      return this.$store.getters.getLikes
    },
    isLiked(id){ 
      //  console.log("this.likes",this.likes,id,this.likes.find(k=> k.id == id))
      if(this.likes.find(k=> k.id == id)){
        return true
      }
      return false 
    },
    getOptName(id,group,field){
        let options= this.$store.state.core.options
        console.log("options",group,options)
        if(options && options[group]){
            let res = options[group].find(k=> k.id==id)
            if(field && res){
              return res[field]
            }else{
              return res
            }
        }
    },
    visitorCount(data,ops){ 
      axios({
        url: process.env.baseURL+"pVisitor",
        method: 'get',
        params: {
            limit:1,
            offset:0, 
            filter:{pvit_ContentId:["=",ops.id]},
            fields:'pvit_Link,pvit_Visitor,pvit_UVisitor,pvit_Title,pvit_VComment,pvit_VSocial,id', 
        }  
      }).then(response => {
           data = response.data && response.data.formattedData && response.data.formattedData[0] ? parseInt(response.data.formattedData[0].pvit_Visitor) : 0
           this.totals.visitor = data;
      }).catch(e => {
         console.log(e)
        })   
  }, 
  }, 
  mounted(){
       
    // Animate
    (function($) {
    
      'use strict';
    
      if ($.isFunction($.fn['themePluginAnimate'])) {
    
        $(function() {
          $('[data-appear-animation]').each(function() {
            var $this = $(this),
              opts;
    
            var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
            if (pluginOptions)
              opts = pluginOptions;
    
            $this.themePluginAnimate(opts);
          });
        });
    
      }
    
    }).apply(this, [jQuery]);
    
    // Animated Letters
    (function($) {
    
      'use strict';
    
                  if ($.isFunction($.fn['themePluginAnimatedLetters'])) {
    
                            $(function() {
                                $('[data-plugin-animated-letters]:not(.manual), .animated-letters').each(function() {
                                    var $this = $(this),
                                        opts;
    
                                    var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                                    if (pluginOptions)
                                        opts = pluginOptions;
    
                                    $this.themePluginAnimatedLetters(opts);
                                });
                            });
    
                        }
    
                    }).apply(this, [jQuery]);
        
    },
};
