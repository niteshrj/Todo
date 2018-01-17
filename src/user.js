let ToDoList = require('./toDoList.js');

class User {
  constructor(name,password) {
    this.name = name;
    this.password = password;
    this.counter = 0;
    this.toDos = {};
  }
  getName(){
    return this.name;
  }
  getPassword(){
    return this.password;
  }
  getAllToDo(){
    return this.toDos;
  }
  getCounter(){
    return this.counter;
  }
  addNewToDo(title,description){
    let newToDo = new ToDoList(title,description);
    this.counter++;
    this.toDos[`ToDo${this.counter}`] = newToDo;
  }
  getTitleOfList(listId){
    return this.toDos[listId].getTitle();
  }
  getDescriptionOfList(listId){
    return this.toDos[listId].getDescription();
  }
  changeTitleOfList(listId,newTitle){
    return this.toDos[listId].changeTitle(newTitle);
  }
  changeDescriptionOfList(listId,newDescription){
    return this.toDos[listId].changeDescription(newDescription);
  }
  getCounterOfList(listId){
    return this.toDos[listId].getCounter();
  }
  getItemsOfList(listId){
    return this.toDos[listId].getItems();
  }
  addItemInList(listId,objective){
    return this.toDos[listId].addItem(objective);
  }
  removeItemFromList(listId,itemId){
    return this.toDos[listId].removesItem(itemId);
  }
  getObjectiveOfItemInList(listId,itemId){
    return this.toDos[listId].getObjectiveOfItem(itemId);
  }
  getStatusOfItemInList(listId,itemId){
    return this.toDos[listId].getStatusOfItem(itemId);
  }
  changeItemObjective(listId,itemId,newObjective){
    return this.toDos[listId].updateItemObjective(itemId,newObjective);
  }
  markItemDoneInList(listId,itemId){
    return this.toDos[listId].markItemDone(itemId);
  }
  markItemNotDoneInList(listId,itemId){
    return this.toDos[listId].markItemNotDone(itemId);
  }
}

module.exports = User;
