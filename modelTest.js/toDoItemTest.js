let assert = require('chai').assert;
let ToDoItem = require('../src/toDoItem.js');

describe('ToDoItem',()=>{

  describe('Items Title',()=>{
    it('getObjective() should return objective of the item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      assert.equal(toDoItem.getObjective(),'study');
    })
    it('changeObjective() should change the objective of item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      assert.equal(toDoItem.changeObjective('practice'),'practice');
      assert.equal(toDoItem.getObjective(),'practice');
    })
  })

  describe('Items Status',()=>{
    it('getStatus() should return status of the item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      assert.equal(toDoItem.getStatus(),false);
    })
    it('markAsDone() should change the status of item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      toDoItem.markAsDone();
      assert.equal(toDoItem.getStatus(),true);
    })
    it('markAsUn() should change the status of item',()=>{
      let toDoItem = new ToDoItem('study','regarding maths');
      toDoItem.markAsUndone();
      assert.equal(toDoItem.getStatus(),false);
    })
  })
})
