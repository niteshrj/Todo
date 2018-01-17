class TodoItem {
  constructor(objective) {
    this.objective = objective;
    this.status = false;
  }
  getObjective(){
    return this.objective;
  }
  changeObjective(newObjective){
    return this.objective = newObjective;
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

module.exports = TodoItem;
