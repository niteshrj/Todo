let User = require('./user.js');

class TodoApp {
  constructor() {
    this.allUsers = {};
  }
  getAllUsers(){
    return this.allUsers;
  }
  addNewUser(name,password){
    this.allUsers[name] = new User(name,password);
  }
  deleteUser(name){
    delete this.allUsers[name];
  }
  getNoOfUsers(){
    return Object.keys(this.allUsers).length;
  }
}

module.exports = TodoApp;
