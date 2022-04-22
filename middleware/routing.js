const redirects = require('./routing.json');
export default (req, res, next) => {
//   console.log(r.from+"=== "+ req.url);
  //const redirect = redirects.find(r => r.from === req.url);
  let redirect = null
  if (redirect) {
    console.log(`redirect: ${redirect.from} => ${redirect.to}`);
    res.writeHead(301, { Location: redirect.to });
    res.end();
  } else {
    next();
  }
}