const fs = require('fs');
const WebApp = require('./webapp.js');;
const appUtility = require('./appUtility.js');
const appLib = require('./appLib.js');

const registered_users = [{'userName':'Aditi','password':'1'},{'userName':'Nitesh','password':'2'}];
const CompositeHandler = require('./handlers/compositeHandler.js');
const StaticFileHandler = require('./handlers/staticFileHandler.js');
const PostLogoutHandler = require('./handlers/postLogoutHandler.js');

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

const onDataRequest = function(req,res){
  let userName = getUserName(req);
  let todo = req.body;
  let todos = appLib.users[userName].todos;
  if(todo.title!='' && todo.description!=''){
    appLib.users[userName].addTodo(todo.title,todo.description);
    todos = appLib.users[userName].todos;
    res.write(todos);
    appLib.writeToFile();
    res.end();
    return;
  }
  res.write(todos);
  res.end();
}

const onDelete = function(req,res){
  let todoIndex = req.body.id;
  let userName = getUserName(req);
  appLib.users[userName].deleteTodo(todoIndex);
  let todos = appLib.users[userName].todos;
  res.write(todos);
  appLib.writeToFile();
  res.end();
}
const deleteItem = function(req,res){
  let todoIndex = req.body.todoIndex;
  let itemIndex = req.body.itemIndex;
  let userName = getUserName(req);
  appLib.users[userName].deleteItem(todoIndex,itemIndex);
  let items = appLib.users[userName].getItems(todoIndex);
  res.write(items);
  appLib.writeToFile();
  res.end();
}


const addItem = function(req,res){
  let item = req.body.item;
  let index = req.body.index;
  let userName = getUserName(req);
  appLib.users[userName].addItem(index,item);
  let items = appLib.users[userName].getItems(index);
  if(item==""){
    res.write(items);
    res.end();
    return;
  }
  appLib.writeToFile();
  res.write(items);
  res.end();
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(appLib.loadFileData);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.use(compositeHandler.getRequestHandler());

app.post('/onDataRequest',onDataRequest);
app.post('/logIn',postLoginAction);
app.post('/onDelete',onDelete);
app.post('/deleteItem',deleteItem);
app.post('/addItem',addItem);

app.post('/logout',postLogoutHandler.getRequestHandler());

module.exports = app;
