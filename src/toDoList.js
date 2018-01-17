let ToDoItem = require('./toDoItem.js');

class TodoList {
  constructor(title,description) {
    this.title = title;
    this.description = description;
    this.counter = 0;
    this.items = {};
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  changeTitle(newTitle){
    this.title = newTitle;
  }
  changeDescription(newDescription){
    this.description = newDescription;
  }
  getCounter(){
    return this.counter;
  }
  getItems(){
    return this.items;
  }
  addItem(objective){
    this.counter++;
    this.items[`Item${this.counter}`] = new ToDoItem(objective);
  }
  removesItem(itemId){
    this.counter--;
    delete this.items[itemId];
  }
  getObjectiveOfItem(itemId){
    return this.items[itemId].getObjective();
  }
  getStatusOfItem(itemId){
    return this.items[itemId].getStatus();
  }
  updateItemObjective(itemId,newObjective){
    this.items[itemId].changeObjective(newObjective);
  }
  markItemDone(itemId){
    this.items[itemId].markAsDone();
  }
  markItemNotDone(itemId){
    this.items[itemId].markAsUndone();
  }
}

module.exports = TodoList;
