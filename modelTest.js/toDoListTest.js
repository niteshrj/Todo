let assert = require('chai').assert;
let ToDoList = require('../src/toDoList.js');

describe('ToDoList',()=>{

  describe('List Title',()=>{
    it('getTitle() should return the title of the list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      assert.equal(toDoList.getTitle(),'study');
    })
    it('changeTitle() should change the title of list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      toDoList.changeTitle('practice');
      assert.equal(toDoList.getTitle(),'practice');
    })
  })

  describe('List Description',()=>{
    it('getDescription() should return the description of the list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      assert.equal(toDoList.getDescription(),'regarding science');
    })
    it('changeDescription() should change the description of list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      toDoList.changeDescription('regarding maths');
      assert.equal(toDoList.getDescription(),'regarding maths');
    })
  })

  describe('List Items',()=>{
    it('getItems() should return the no of the items in list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      assert.deepEqual(toDoList.getItems(),{});
    })
    it('getCounter() should return the no of the items in list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      assert.equal(toDoList.getCounter(),0);
    })
    it('addItem() should add new item in list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      toDoList.addItem('read book');
      assert.deepEqual(toDoList.getItems(),{'Item1':{'objective':'read book','status':false}});
      assert.equal(toDoList.getCounter(),1);
    })
    it('removeItem() should remove existing item from list',()=>{
      let toDoList = new ToDoList('study','regarding science',0);
      toDoList.removesItem();
      assert.deepEqual(toDoList.getItems(),{});
      assert.equal(toDoList.getCounter(),0);
    })
  })
})
