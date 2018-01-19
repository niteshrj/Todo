let fs = require('fs');
let WebApp = require('./webapp.js');;
let appUtility = require('./appUtility.js');
let registered_users = [{'userName':'aditi','password':'aditi123'}];

let CompositeHandler = require('./handlers/compositeHandler.js');
let StaticFileHandler = require('./handlers/staticFileHandler.js');
let PostLoginHandler = require('./handlers/postLoginHandler.js');
let PostLogoutHandler = require('./handlers/postLogoutHandler.js');
let PostSubmitToDoHandler = require('./handlers/postSubmitToDoHandler.js');

let compositeHandler = new CompositeHandler();
let staticFileHandler = new StaticFileHandler('public');
let postLoginHandler = new PostLoginHandler();
let postLogoutHandler = new PostLogoutHandler();
let postSubmitToDoHandler = new PostSubmitToDoHandler();

compositeHandler.addHandler(staticFileHandler);


let logRequest = appUtility.logRequest;
let getContentType = appUtility.getContentType;
let readFile = appUtility.readFile;
let isFile = appUtility.isFile;


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

app.post('/logIn',postLoginHandler.getRequestHandler());

app.post('/logout',postLogoutHandler.getRequestHandler());

app.post('/toDo',postSubmitToDoHandler.getRequestHandler());

module.exports = app;
