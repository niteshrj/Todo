let assert = require('chai').assert;
let ToDoItem = require('../src/toDoItem.js');

describe('ToDoItem',()=>{

  describe('getObjective',()=>{
    it('Should return objective of the item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      assert.equal(toDoItem.getObjective(),'study');
    })
  })

  describe('changeObjective',()=>{
    it('Should change the objective of item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      assert.equal(toDoItem.changeObjective('practice'),'practice');
      assert.equal(toDoItem.getObjective(),'practice');
    })
  })

  describe('getStatus',()=>{
    it('Should return status of the item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      assert.equal(toDoItem.getStatus(),false);
    })
  })

  describe('markAsDone',()=>{
    it('Should change the status of item as done',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      toDoItem.markAsDone();
      assert.equal(toDoItem.getStatus(),true);
    })
  })

  describe('markAsUndone',()=>{
    it('Should change the status of item as not done',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      toDoItem.markAsUndone();
      assert.equal(toDoItem.getStatus(),false);
    })
  })

})
