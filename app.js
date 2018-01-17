let fs = require('fs');
let WebApp = require('./webapp.js');
let registered_users = [{userName:'aditi',password:'adu'}];
let User = require('./src/user.js');
let appUtility = require('./appUtility.js');
let CompositeHandler = require('./handlers/compositeHandler.js');
let StaticFileHandler = require('./handlers/staticFileHandler.js');

let compositeHandler = new CompositeHandler();
let staticFileHandler = new StaticFileHandler('public');

compositeHandler.addHandler(staticFileHandler);



let logRequest = appUtility.logRequest;
let getContentType = appUtility.getContentType;
let readFile = appUtility.readFile;
let isFile = appUtility.isFile;


let user = new User('aditi','adu');
// console.log(user);


let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

let postLogin = function(req,res){
  console.log('hi');
  let validUser = (user)=>{user.name==req.body.username};
  if(!validUser){
    res.setHeader('Set-Cookie','loginFailed=true');
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/homePage.html');
}


let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);

app.post('/loggedIn',postLogin);

app.use(compositeHandler.getRequestHandler());

module.exports = app;
