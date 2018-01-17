let assert = require('chai').assert;
let User = require('../src/user.js');
let user;

describe('User',()=>{

  beforeEach(function () {
    user = new User('aditi','aditi123');
  })

  describe('getName',()=>{
    it('Should return the name of user',()=>{
      assert.equal(user.getName(),'aditi');
    })
  })

  describe('getPassword',()=>{
    it('Should return the password of user',()=>{
      assert.equal(user.getPassword(),'aditi123');
    })
  })

  describe('getAllToDo',()=>{
    it('Should return the all To Do of user',()=>{
      assert.deepEqual(user.getAllToDo(),{});
    })
  })

  describe('addNewToDo',()=>{
    it('Should add new To Do in user account',()=>{
      user.addNewToDo('cricket','to play');
      assert.deepEqual(user.getAllToDo(),{'ToDo1':{'title':'cricket','description':'to play',
      'counter':0,'items':{}}});
    })
  })

  describe('getTitleOfList',()=>{
    it('Should return title of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getTitleOfList('ToDo1'),'cricket');
    })
  })

  describe('getDescriptionOfList',()=>{
    it('Should return description of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getDescriptionOfList('ToDo1'),'to play');
    })
  })

  describe('changeTitleOfList',()=>{
    it('Should change title of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      user.changeTitleOfList('ToDo1','tennis');
      assert.deepEqual(user.getTitleOfList('ToDo1'),'tennis');
    })
  })

  describe('changeDescriptionOfList',()=>{
    it('Should change description of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      user.changeDescriptionOfList('ToDo1','to fun');
      assert.deepEqual(user.getDescriptionOfList('ToDo1'),'to fun');
    })
  })

  describe('changeDescriptionOfList',()=>{
    it('Should change description of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      user.changeDescriptionOfList('ToDo1','to fun');
      assert.deepEqual(user.getDescriptionOfList('ToDo1'),'to fun');
    })
  })
  describe('getCounterOfList',()=>{
    it('Should return counter of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getCounterOfList('ToDo1'),0);
    })
  })

  describe('getItemsOfList',()=>{
    it('Should return all items of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getItemsOfList('ToDo1'),{});
    })
  })


  describe('addItemInList',()=>{
    it('Should add item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      user.addItemInList('ToDo1','batting');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':1,
        'items':{'Item1':{'objective':'batting','status':false}}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
    })
  })

  describe('removeItemFromList',()=>{
    it('Should remove item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      user.addItemInList('ToDo1','batting');
      user.removeItemFromList('ToDo1','Item1');
      assert.deepEqual(user.getAllToDo(),{
        'ToDo1':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'ToDo2':{'title':'study','description':'practice','counter':0,'items':{}}
      })
    })
  })

  describe('getObjectiveOfItemInList',()=>{
    it('Should return objective of item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('ToDo1','batting');
      assert.deepEqual(user.getObjectiveOfItemInList('ToDo1','Item1'),'batting');
    })
  })

  describe('getStatusOfItemInList',()=>{
    it('Should return status of item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('ToDo1','batting');
      assert.deepEqual(user.getStatusOfItemInList('ToDo1','Item1'),false);
    })
  })

  describe('changeItemObjective',()=>{
    it('Should change objective of item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('ToDo1','batting');
      user.changeItemObjective('ToDo1','Item1','bowling');
      assert.deepEqual(user.getObjectiveOfItemInList('ToDo1','Item1'),'bowling');
    })
  })

  describe('markItemDoneInList',()=>{
    it('Should mark item as done in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('ToDo1','batting');
      user.markItemDoneInList('ToDo1','Item1');
      assert.equal(user.getStatusOfItemInList('ToDo1','Item1'),true);
    })
  })

  describe('markItemNotDoneInList',()=>{
    it('Should mark item as not done in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('ToDo1','batting');
      user.markItemDoneInList('ToDo1','Item1');
      user.markItemNotDoneInList('ToDo1','Item1');
      assert.equal(user.getStatusOfItemInList('ToDo1','Item1'),false);
    })
  })
})
