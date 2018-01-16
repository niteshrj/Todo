let ToDoList = require('./toDoList.js');

class User {
  constructor(userName,userPassword) {
    this.userName = userName;
    this.userPassword = userPassword;
    this.allToDo = [];
  }
  getUserName(){
    return this.userName;
  }
  getUserPassword(){
    return this.userPassword;
  }
  getAllToDo(){
    return this.allToDo;
  }
  addNewToDo(title,description){
    let newToDo = new ToDoList(title,description);
    this.allToDo.push(newToDo);
  }
}

module.exports = User;
