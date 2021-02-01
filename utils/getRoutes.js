const axios = require('axios');
const appRoutes = require('./routes.json');
require('dotenv').config()
module.exports = async function getAppRoutes() {
  // Initiate axios
  
const baseURL = "https://api2.fatihd.com/api/";
  // Fetch available languages and store their codes (fr, en, ...) in array
//   const availableLanguages = await axios.get('/languages').then(res => res.data.map(language => language.id));
  const availableLanguages = ["tr","en"]
  // Fetch blogPosts as object with languages as attributes and slugs as their values
  // const papers =  await axios({
  //   url: baseURL+"ReMain",
  //   method: 'get',
  //   params: {
  //       limit:10000,
  //       lang:"en",
  //       filter:{'status':['=',1]},
  //       fields:'rs_Link',
  //       sort:['created_on,ASC']
  //   }  
  // })
  // .then(response => {
  //      let pages = response.data.formattedData
  //      return pages
  //   //   pages.forEach(e => {
  //   //     langs.forEach(l => {
  //   //       donen.push(""+l+"/paper/"+e.rs_Link)
  //   //     }); 
  //   //   });
  //  }).catch(e => {
  //               console.log("ERR",e) 
  //  }); 

  //  const experts = await axios({
  //   url: baseURL+"Uzman",
  //   method: 'get',
  //   params: {
  //       limit:10000,
  //       lang:"en",
  //       filter:{'status':['=',1]},
  //       fields:'exp_Link',
  //       sort:['created_on,ASC']
  //   }  
  // })
  // .then(response => {
  //      return response.data.formattedData
  //   //   pages.forEach(e => {
  //   //     langs.forEach(l => {
  //   //       donen.push(""+l+"/expert/"+e.exp_Link)
  //   //     }); 
  //   //   });
  //  }).catch(e => {
  //               console.log("ERR",e) 
  //  }); 

   const blogs = await axios({
    url: baseURL+"all_links",
    method: 'get',
    params: {
        limit:10000,
        lang:"en",
        filter:{'wa_lang':['=','ar'],wa_MainGroup:["=","Yazilar"]},
        fields:'wa_link',
        sort:['id,ASC']
    }  
  })
  .then(response => {
       return response.data.formattedData 
   }).catch(e => {
                console.log("ERR",e) 
   }); 
   const stabil = await axios({
    url: baseURL+"stabilPages",
    method: 'get',
    params: {
        limit:10000,
        lang:"en",
        filter:{'status':['=',1],SPg_Category:["=","c3RhYmlsUGFnZXMxNDk0NTcxODI3"]},
        fields:'SPg_Link',
        sort:['id,ASC']
    }  
  })
  .then(response => {
       return response.data.formattedData 
   }).catch(e => {
                console.log("ERR",e) 
   }); 

  const routes = [];

  // for every language
  for (let i = 0; i < availableLanguages.length; i += 1) {
    // and every route defined in routes.json
    for (let k = 0; k < appRoutes.length; k += 1) {
      let routePath = appRoutes[k];
      const language = availableLanguages[i];

      // replace the language placeholder with current language
      routePath = routePath.replace(/:lang/, language);

      // If the route includes 'blog', iterate over all fetched posts in current language
      if (routePath.includes('/page/')) { 
        blogs.forEach(e => {
            routes.push(routePath.replace(/:id/, e.wa_link));
        }); 
        stabil.forEach(e => {
            routes.push(routePath.replace(/:id/, e.SPg_Link));
        }); 
    }else
     
        routes.push(routePath);
      
    }
  }

  // Return all available routes
  return routes;
};
