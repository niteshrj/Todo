let ToDoList = require('./toDoList.js');

class User {
  constructor(name,password) {
    this.name = name;
    this.password = password;
    this.allToDos = [];
  }
  getName(){
    return this.name;
  }
  getPassword(){
    return this.password;
  }
  getAllToDo(){
    return this.allToDos;
  }
  addNewToDo(title,description){
    let newToDo = new ToDoList(title,description);
    this.allToDos.push(newToDo);
  }
}

module.exports = User;
