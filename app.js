let fs = require('fs');
let WebApp = require('./webapp.js');;
let appUtility = require('./appUtility.js');
let registered_users = [{'userName':'a','password':'1'}];

let CompositeHandler = require('./handlers/compositeHandler.js');
let StaticFileHandler = require('./handlers/staticFileHandler.js');
let PostLogoutHandler = require('./handlers/postLogoutHandler.js');

let compositeHandler = new CompositeHandler();
let staticFileHandler = new StaticFileHandler('public');
let postLogoutHandler = new PostLogoutHandler();

compositeHandler.addHandler(staticFileHandler);

const redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login.html']) && req.user) res.redirect('/homePage.html');
}
const redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/','/homePage.html','/logout']) && !req.user) res.redirect('/login.html');
}
let logRequest = appUtility.logRequest;
let getContentType = appUtility.getContentType;
let readFile = appUtility.readFile;
let isFile = appUtility.isFile;


let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  console.log(`sessionid - ${sessionid}`);
  console.log(`user - ${user}`);
  if(sessionid && user){
    req.user = user;
  }
};

const postLoginAction = function(req,res){
  let validUser = registered_users.find((u)=>u.userName==req.body.name);
  let validPassword = registered_users.find((u)=>u.password==req.body.password);
  console.log(validUser);
  console.log(validPassword);
  if(!validUser || !validPassword){
    res.setHeader('Set-Cookie',`message=login Failed ; Max-Age=5`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  validUser.sessionid = sessionid;
  console.log(validUser);
  res.redirect('/homePage.html');
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);

app.use(compositeHandler.getRequestHandler());

app.post('/login',postLoginAction);

app.post('/logout',postLogoutHandler.getRequestHandler());

module.exports = app;
