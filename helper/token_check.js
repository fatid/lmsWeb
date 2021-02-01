import jwt from 'jsonwebtoken' 
export function token_check(token) 
{ 
  return new Promise((resolve, reject) =>
  {
     jwt.verify(token, 'FATIH*DEMIR', function(err, decoded) {
        if (err || !decoded)  {    return reject(err)   }
        resolve(decoded) 
    }) 
  })
}