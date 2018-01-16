class ToDoItem {
  constructor(objective) {
    this.objective = objective;
    this.status = false;
  }
  getObjective(){
    return this.objective;
  }
  changeObjective(newObjective){
    this.objective = newObjective;
    return this.objective;
  }
  getStatus(){
    return this.status;
  }
  markAsDone(){
    return this.status = true;
  }
  markAsUndone(){
    return this.status = false;
  }
}

module.exports = ToDoItem;
