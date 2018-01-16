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
  addItem(itemTitle){
    this.counter++;
    this.items[`Item${this.counter}`] = new ToDoItem(itemTitle);
  }
  removesItem(itemTitle){
    delete this.items[itemTitle];
  }
}

module.exports = ToDoList;
