let User = require('./user.js');

class ToDoApp {
  constructor() {
    this.allUsers = {};
    this.userId = 0;
    this.noOfUsers = 0;
  }
  getAllUser(){
    return this.allUsers;
  }
  addNewUser(name,password){
    this.noOfUsers++;
    this.userId++;
    this.allUsers[`User${this.userId}`] = new User(name,password);
  }
  deleteUser(userId){
    this.noOfUsers--;
    delete this.allUsers[userId];
  }
  getNoOfUser(){
    return this.noOfUsers;
  }
}

module.exports = ToDoApp;
