let fs = require('fs');
let WebApp = require('./webapp.js');;
let appUtility = require('./appUtility.js');
let registered_users = [{'userName':'aditi','password':'aditi123'},
{'userName':'asha','password':'asha321'}];

let CompositeHandler = require('./handlers/compositeHandler.js');
let StaticFileHandler = require('./handlers/staticFileHandler.js');
let PostLoginHandler = require('./handlers/postLoginHandler.js');

let compositeHandler = new CompositeHandler();
let staticFileHandler = new StaticFileHandler('public');
let postLoginHandler = new PostLoginHandler();
// console.log(postLoginHandler);

compositeHandler.addHandler(staticFileHandler);




let logRequest = appUtility.logRequest;
let getContentType = appUtility.getContentType;
let readFile = appUtility.readFile;
let isFile = appUtility.isFile;

// console.log(user);


let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};



let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);

app.use(compositeHandler.getRequestHandler());

// console.log(postLoginHandler.getRequestHandler());
app.post('/loggedIn',postLoginHandler.getRequestHandler());

module.exports = app;
