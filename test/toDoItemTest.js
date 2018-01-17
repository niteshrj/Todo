let assert = require('chai').assert;
let TodoItem = require('../src/toDoItem.js');
let toDoItem;

describe('TodoItem',()=>{

  beforeEach(function(){
    toDoItem = new TodoItem('study','regarding maths');
  })

  describe('getObjective',()=>{
    it('Should return objective of the item',()=>{
      assert.equal(toDoItem.getObjective(),'study');
    })
  })

  describe('changeObjective',()=>{
    it('Should change the objective of item',()=>{
      assert.equal(toDoItem.changeObjective('practice'),'practice');
      assert.equal(toDoItem.getObjective(),'practice');
    })
  })

  describe('getStatus',()=>{
    it('Should return status of the item',()=>{
      assert.equal(toDoItem.getStatus(),false);
    })
  })

  describe('markAsDone',()=>{
    it('Should change the status of item as done',()=>{
      toDoItem.markAsDone();
      assert.equal(toDoItem.getStatus(),true);
    })
  })

  describe('markAsUndone',()=>{
    it('Should change the status of item as not done',()=>{
      toDoItem.markAsUndone();
      assert.equal(toDoItem.getStatus(),false);
    })
  })

})
