let fs = require('fs');
let timeStamp = require('./time.js').timeStamp;
let http = require('http');
let WebApp = require('./webapp');
let registered_users = [{userName:'aditi',name:'Aditi Lahare'},
{userName:'pranali',name:'Pranali Lahare'}];
let toS = o=>JSON.stringify(o,null,2);

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


let serveFile = function(req,res){
  let fileName = `public${req.url}`;
  try {
    let fileContent = fs.readFileSync(fileName);
    res.write(fileContent);
    res.end();
  } catch (e) {
    return;
  }
}

let provideHomePageToUser = function(req,res){
  let homePage = fs.readFileSync('./public/homePage.html');
  res.write(homePage);
  res.end();
}


let getUpdatedToDoList = function(toDoList){
  let existingToDoList = fs.readFileSync('data/toDoList.json','utf8');
  existingToDoList = JSON.parse(existingToDoList,null,2);
  existingToDoList.unshift(toDoList);
  let updatedToDoList = JSON.stringify(existingToDoList);
  return updatedToDoList;
}

let updateToDoListInFiles = function(allToDoList){
  fs.writeFileSync('data/toDoList.json',allToDoList);
}

let handleToDoList = function(toDoList){
  let allToDoList = getUpdatedToDoList(toDoList);
  updateToDoListInFiles(allToDoList);
}

let passSubmittedDataToHandle = function(req,res){
  let toDoList = req.body;
  // console.log(toDoList);
  handleToDoList(toDoList);
  res.end();
}

let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);

app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

app.post('/loggedIn',provideHomePageToUser);

app.post('/submitToDo',passSubmittedDataToHandle);

app.use(serveFile);


const PORT = 5000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));

module.exports = app;
