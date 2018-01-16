let ToDoItem = require('./toDoItem.js');

class ToDoList {
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
  removesItem(itemNo){
    this.counter--;
    delete this.items[itemNo];
  }
  getObjectiveOfItem(itemNo){
    return this.items[itemNo].objective;
  }
  getStatusOfItem(itemNo){
    return this.items[itemNo].status;
  }
  updateItemObjective(itemNo,newObjective){
    this.items[itemNo].objective = newObjective;
  }
  markItemDone(itemNo){
    this.items[itemNo].status = true;
  }
  markItemNotDone(itemNo){
    this.items[itemNo].status = false;
  }
}

module.exports = ToDoList;
