const fs = require('fs');
const User = require('./src/user.js').User;


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
    console.log(fileData);
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
  }
}

module.exports = lib;
