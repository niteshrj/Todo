let fs = require('fs');
let timeStamp = require('./time.js').timeStamp;
let WebApp = require('./webapp.js');
let registered_users = [{userName:'aditi',password:'adu'}];
let toS = o=>JSON.stringify(o,null,2);
let User = require('./src/user.js');


let user = new User('aditi','adu');

let logRequest = (req,res)=>{
  let text = ['------------------------------',
  `${timeStamp()}`,
  `${req.method} ${req.url}`,
  `HEADERS=> ${toS(req.headers)}`,
  `COOKIES=> ${toS(req.cookies)}`,
  `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};


let getContentType = (req)=>{
  let extension = req.url.slice(req.url.lastIndexOf('.'));
  let contentTypes = {
    ".jpg" : "img/jpg",
    ".txt" : "text/txt",
    ".html" : "text/html",
    ".css" : "text/css",
    ".pdf" : "application/pdf",
    ".gif" : "img/gif",
    ".js" : "text/javascript"
  };
  return contentTypes[extension];
};

let readFile = function(filePath){
  return fs.readFileSync(filePath,'utf8');
}

let isFile = function(filePath){
  return fs.statSync(filePath).isFile();
}


let serveStaticFiles = function(req,res){
  let filePath = req.url;
  if(filePath=='/'){
    res.redirect('/login.html');
  }
  filePath = './public'+req.url;
  if(isFile(filePath)){
    let content = readFile(filePath);
    res.setHeader('Content-type',`${getContentType(req)}`);
    res.write(content);
    res.end();
    return;
  }
}


let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);

app.use(serveStaticFiles);

module.exports = app;
