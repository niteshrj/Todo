let DefaultHandler = require('./defaultHandler.js');
let fs = require('fs');

class PostSubmitToDoHandler extends DefaultHandler{
  constructor() {
    super()
  }
  execute(req,res){
    let currentToDo = req.body;
    this.handleToDo(currentToDo);
    let titles = this.viewTitles(req,res);
  }
  handleToDo(currentToDo){
    let updatedToDo = this.getUpdatedToDo(currentToDo);
    this.restoredUpdatedToDo(updatedToDo);
  }
  getUpdatedToDo(currentToDo){
    let existingToDos = fs.readFileSync('./data/toDoList.json','utf8');
    existingToDos = JSON.parse(existingToDos);
    existingToDos.unshift(currentToDo);
    let updatedToDo = JSON.stringify(existingToDos,null,2);
    return updatedToDo;
  }
  restoredUpdatedToDo(updatedToDo){
    fs.writeFileSync('./data/toDoList.json',updatedToDo);
  }
  viewTitles(req,res){
    let toDos = fs.readFileSync('./data/toDoList.json','utf8');
    toDos = JSON.parse(toDos);
    let titles = toDos.map((u)=>u.Title);
    return titles;
  }
}

module.exports = PostSubmitToDoHandler;
