let fs = require('fs');
let WebApp = require('./webapp.js');;
let appUtility = require('./appUtility.js');
let registered_users = [{'userName':'Aditi','password':'1'},{'userName':'Nitesh','password':'2'}];
let CompositeHandler = require('./handlers/compositeHandler.js');
let StaticFileHandler = require('./handlers/staticFileHandler.js');
let PostLogoutHandler = require('./handlers/postLogoutHandler.js');

let compositeHandler = new CompositeHandler();
let staticFileHandler = new StaticFileHandler('public');
let postLogoutHandler = new PostLogoutHandler();

compositeHandler.addHandler(staticFileHandler);

const redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login.html']) && req.user) res.redirect('/home.html');
}
const redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/','/home.html','/logout']) && !req.user) res.redirect('/login.html');
}
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

const postLoginAction = function(req,res){
  let validUser = registered_users.find((u)=>u.userName==req.body.name);
  let validPassword = registered_users.find((u)=>u.password==req.body.password);
  if(!validUser || !validPassword){
    res.setHeader('Set-Cookie',`message=login Failed ; Max-Age=5`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  validUser.sessionid = sessionid;
  res.redirect('/home.html');
}

const getUserName = function(req){
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  let userName = user['userName'];
  return userName;
}
const writeToFile = function(data,todo,userName){
  let parsedData = data;
  parsedData[userName].push(todo);
  parsedData = JSON.stringify(parsedData,null,2);
  fs.writeFileSync('./data/data.json',parsedData);
  data = fs.readFileSync('./data/data.json','utf8');
  return data;
}

const onDataRequest = function(req,res){
  let userName = getUserName(req);
  let todo = req.body;
  todo.items = [];
  let data = fs.readFileSync('./data/data.json','utf8');
  data = JSON.parse(data);
  let userTodo = data[userName];
  userTodo = JSON.stringify(userTodo);
  if(todo.title!='' && todo.description!=''){
    writeToFile(data,todo,userName);
    res.write(userTodo);
    res.end();
    return;
  }
  res.write(userTodo);
  res.end();
}

const onDelete = function(req,res){
  let todoIndex = req.body.id;
  let userName = getUserName(req);
  let data = fs.readFileSync('./data/data.json','utf8');
  data = JSON.parse(data);
  data[userName].splice(todoIndex,1);
  data = JSON.stringify(data,null,2);
  fs.writeFileSync('./data/data.json',data);
}

const addItem = function(req,res){
  let item = req.body.item;
  let index = req.body.index;
  let userName = getUserName(req);
  let data = fs.readFileSync('./data/data.json','utf8');
  data = JSON.parse(data);
  data[userName][index]['items'].push(item);
  data = JSON.stringify(data,null,2);
  fs.writeFileSync('./data/data.json',data);
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.use(compositeHandler.getRequestHandler());

app.post('/onDataRequest',onDataRequest);
app.post('/logIn',postLoginAction);
app.post('/onDelete',onDelete);
app.post('/addItem',addItem);

app.post('/logout',postLogoutHandler.getRequestHandler());

module.exports = app;
