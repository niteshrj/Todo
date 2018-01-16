let assert = require('chai').assert;
let ToDoList = require('../src/toDoList.js');

describe('ToDoList',()=>{

  describe('getTitle',()=>{
    it('Should return the title of the list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      assert.equal(toDoList.getTitle(),'study');
    })
  })

  describe('changeTitle',()=>{
    it('Should change the title of list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.changeTitle('practice');
      assert.equal(toDoList.getTitle(),'practice');
    })
  })

  describe('getDescription',()=>{
    it('Should return the description of the list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      assert.equal(toDoList.getDescription(),'regarding science');
    })
  })

  describe('changeDescription',()=>{
    it('Should change the description of list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.changeDescription('regarding maths');
      assert.equal(toDoList.getDescription(),'regarding maths');
    })
  })

  describe('getItems',()=>{
    it('Should return the all the items in list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      assert.deepEqual(toDoList.getItems(),{});
    })
  })

  describe('getCounter',()=>{
    it('Should return the no of the items in list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      assert.equal(toDoList.getCounter(),0);
    })
  })

  describe('addItem',()=>{
    it('Should add new item in list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.addItem('read book');
      assert.deepEqual(toDoList.getItems(),{'Item1':{'objective':'read book','status':false}});
      assert.equal(toDoList.getCounter(),1);
    })
  })

  describe('removeItem',()=>{
    it('Should remove existing item from list',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.addItem('read book');
      toDoList.removesItem('Item1');
      assert.equal(toDoList.getCounter(),0);
    })
  })

  describe('getObjectiveOfItem',()=>{
    it('Should return objective of any particular item',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.addItem('read book');
      toDoList.addItem('read paper');
      assert.deepEqual(toDoList.getObjectiveOfItem('Item1'),'read book');
    })
  })

  describe('getStatusOfItem',()=>{
    it('Should return status of any particular item',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.addItem('read book');
      toDoList.addItem('read paper');
      assert.deepEqual(toDoList.getStatusOfItem('Item2'),false);
    })
  })

  describe('updateItemObjective',()=>{
    it('Should change objective of any particular item',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.addItem('read book');
      toDoList.addItem('read paper');
      toDoList.updateItemObjective('Item2','write paper');
      assert.deepEqual(toDoList.getObjectiveOfItem('Item2'),'write paper');
    })
  })

  describe('markItemDone',()=>{
    it('Should change status of any particular item as done',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.addItem('read book');
      toDoList.addItem('read paper');
      toDoList.markItemDone('Item2');
      assert.deepEqual(toDoList.getStatusOfItem('Item2'),true);
    })
  })

  describe('markItemNotDone',()=>{
    it('Should change status of any particular item as done',()=>{
      let toDoList = new ToDoList('study','regarding science');
      toDoList.addItem('read book');
      toDoList.addItem('read paper');
      toDoList.markItemDone('Item2');
      toDoList.markItemNotDone('Item2');
      assert.deepEqual(toDoList.getStatusOfItem('Item2'),false);
    })
  })
})
