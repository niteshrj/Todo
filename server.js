let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');
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

  // console.log(`${req.method} ${req.url}`);
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

let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);

app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

app.use(serveFile);


const PORT = 5000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
