const fs = require('fs');
const User = require('./src/user.js').User;
const timeStamp = require('./time').timeStamp;

const toJsonString = function(data){
  return JSON.stringify(data,null,2);
}

const getAllFileData = function(){
  try{
    return fs.readFileSync('./data/data.json','utf8');
  }catch(e){
    console.log(e);
  }
}

let lib = {
  users : {},
  loadFileData : function(){
    let fileData = getAllFileData();
    let users = JSON.parse(fileData);
    let usernames = Object.keys(users);
    usernames.map((username)=>{
      users[username].__proto__ = new User().__proto__;
    });
    lib.users = users;
  },
  writeToFile : function(){
    let users = JSON.stringify(lib.users,null,2);
    fs.writeFileSync('./data/data.json',users);
  },
  logRequest : (req,res)=>{
    let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toJsonString(req.headers)}`,
    `COOKIES=> ${toJsonString(req.cookies)}`,
    `BODY=> ${toJsonString(req.body)}`,''].join('\n');
    fs.appendFile('request.log',text,()=>{});
    console.log(`${req.method} ${req.url}`);
  }
}

module.exports = lib;
