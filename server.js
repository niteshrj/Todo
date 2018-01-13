let fs = require('fs');
let timeStamp = require('./time.js').timeStamp;
let http = require('http');
let WebApp = require('./webapp');
let registered_users = [{userName:'aditi',password:'aditi'},
{userName:'pranali',password:'pranali'}];
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
  let user = registered_users.find(u=>u.userName==req.body.name);
  let password = registered_users.find(u=>u.password==req.body.password);
  if(user && password){
    let homePage = fs.readFileSync('./public/homePage.html');
    res.write(homePage);
    res.end();
    return;
  }
  res.redirect('/login.html');
}


let getUpdatedToDoInJson = function(currentToDoList){
  let existingToDoList = fs.readFileSync('./public/toDo.json','utf8');
  existingToDoList = JSON.parse(existingToDoList);
  existingToDoList.unshift(currentToDoList);
  let updatedToDoList = JSON.stringify(existingToDoList,null,2);
  return updatedToDoList;
}


let toHtml = function(updatedToDo){
  return updatedToDo.map((currentToDoList)=>{
    return `<a href='accessToDo'>${currentToDoList.Title}</a><br>`;
  })
}


let storeToDoInHtmlForm = function(currentToDoList){
  let updatedToDoList = JSON.parse(currentToDoList);
  let toDoListInHtml = toHtml(updatedToDoList).join('\n');
  fs.writeFileSync('public/allToDoList.html',toDoListInHtml);
}


let writeAllToDoInFile = function(updatedToDoList){
  fs.writeFileSync('public/toDo.json',updatedToDoList);
}


let getUpdatedToDoList = function(currentToDoList){
  let existingToDoList = fs.readFileSync('data/toDoList.json','utf8');
  existingToDoList = JSON.parse(existingToDoList);
  existingToDoList.unshift(currentToDoList);
  let updatedToDoList = JSON.stringify(existingToDoList,null,2);
  return updatedToDoList;
}


let updateToDoListInFiles = function(updatedToDo){
  fs.writeFileSync('data/toDoList.json',updatedToDo);
  storeToDoInHtmlForm(updatedToDo);
}


let handleToDoList = function(currentToDoList){
  let updatedToDo = getUpdatedToDoList(currentToDoList);
  let updatedToDoList = getUpdatedToDoInJson(currentToDoList);
  updateToDoListInFiles(updatedToDo);
  writeAllToDoInFile(updatedToDoList);
}


let passSubmittedDataToHandle = function(req,res){
  let currentToDoList = req.body;
  handleToDoList(currentToDoList);
  res.redirect('/homePage.html');
}


// let provideParticularToDo = function(req,res){
//   let listBook = fs.readFileSync('toDo.json','utf8');
//
// }


let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);

app.get('/',(req,res)=>{
  res.redirect('/index.html');
});


app.post('/loggedIn',provideHomePageToUser);

app.post('/submitToDo',passSubmittedDataToHandle);

// app.get('/accessToDo',provideParticularToDo);

app.use(serveFile);


const PORT = 8080;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));

module.exports = app;
