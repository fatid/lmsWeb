export default  async ({store,app,redirect,error,route}) => { 
    // console.log("buradan da geçtik"); 
    // context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
    const r= route.fullPath;
   console.log("r",r)
    if(r=="/"){ redirect('/tr/home') }

    let lng = route.params &&  route.params.lang ?  route.params.lang : 'en'
     store.state.locale = lng;  
    
    await store.dispatch("pages/getPageInfo",{url:route.path,lang:store.state.locale,count:true}).then(async response => {
       if(store.state.pages.pageData.id==""){ 
           app.error({ statusCode: 404, message: 'Sayfa bulunamadı' })
        }else{
          if(store.state.pages.pageData.wa_content_id &&  store.state.pages.pageData.id){
             store.dispatch("pages/setNewVisit",{contentId: store.state.pages.pageData.wa_content_id,pageId: store.state.pages.pageData.id, url:route.path,lang:store.state.locale})
          }
        }
   }).catch(e => {
        error({ statusCode: 404, message: 'Sayfa bulunamadı' })
  });
 }
