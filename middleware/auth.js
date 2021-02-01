// import router from './router'
// import { verifyJWTToken } from '../server/auth'
import {token_check} from '../helper/token_check' 

export default  async ({store,context,redirect,next,req,route }) => { 
 
    const headers = req && req.headers.cookie
   await store.dispatch("changeDevice", { context });
   const lang = store.state.locale
   const restrictedPaths =  '/account/';  
   const restrictedPathsLogin =  [`/${lang}/form/login`,`/${lang}/form/signup`];  
   const r= route.fullPath;
//  if(r=="/"){
//     return redirect('/ar/home')
//  }
   store.dispatch('user/findAuth',{headers})
   if (store.state.user.auth.token) { 
       let auth = store.state.user.auth;
                   await  token_check(auth.token) .then((decodedToken) => { 
                        if(restrictedPathsLogin.includes(r)){
                            return  redirect('/'+lang+'/account/dashboard')
                        } 
                        return'';
                    }).catch((err) => {   
                        // console.log("restrictedPaths",restrictedPaths,r,restrictedPaths.includes(r))
                        if(restrictedPaths.includes(r)){
                            return  redirect('/'+lang+'/form/login')
                        } 
                        return ''
                    }) 
    }else{ 
        if(r.includes(restrictedPaths)){
            return  redirect('/'+lang+'/form/login')
        } 
    }

}