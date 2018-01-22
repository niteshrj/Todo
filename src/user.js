const Todo = require('./todo.js');

class User {
  constructor(name) {
    this._name = name;
    this._todos = [];
  }
  addTodo(title,description){
    let todo = new Todo(title,description);
    console.log(todo);
    this._todos.push(todo);
    return this._todos;
  }
  get todos(){
    return JSON.stringify(this._todos);
  }
  addItem(index,item){
    this._todos[index]['_items'].push(item);
  }
  getItems(index){
    return JSON.stringify(this._todos[index]._items);
  }
}

exports.User = User;
