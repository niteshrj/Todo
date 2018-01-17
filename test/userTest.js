let assert = require('chai').assert;
let User = require('../src/user.js');
let user;

describe('User',()=>{

  beforeEach(function(){
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
      assert.deepEqual(user.getAllToDo(),{'cricket':{'title':'cricket','description':'to play',
      'counter':0,'items':{}}});
    })
  })

  describe('removeToDo',()=>{
    it('Should remove To Do from user account',()=>{
      user.addNewToDo('cricket','to play');
      user.removeToDo('cricket');
      assert.deepEqual(user.getAllToDo(),{});
    })
  })

  describe('getTitleOfList',()=>{
    it('Should return title of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getTitleOfList('cricket'),'cricket');
    })
  })

  describe('getDescriptionOfList',()=>{
    it('Should return description of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getDescriptionOfList('cricket'),'to play');
    })
  })

  describe('changeTitleOfList',()=>{
    it('Should change title of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      user.changeTitleOfList('cricket','tennis');
      assert.deepEqual(user.getTitleOfList('cricket'),'tennis');
    })
  })

  describe('changeDescriptionOfList',()=>{
    it('Should change description of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      user.changeDescriptionOfList('cricket','to fun');
      assert.deepEqual(user.getDescriptionOfList('cricket'),'to fun');
    })
  })

  describe('getCounterOfList',()=>{
    it('Should return counter of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getCounterOfList('cricket'),0);
    })
  })

  describe('getItemsOfList',()=>{
    it('Should return all items of any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      assert.deepEqual(user.getItemsOfList('cricket'),{});
    })
  })


  describe('addItemInList',()=>{
    it('Should add item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
      user.addItemInList('cricket','batting');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':1,
        'items':{'Item1':{'objective':'batting','status':false}}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
    })
  })

  describe('removeItemFromList',()=>{
    it('Should remove item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addNewToDo('study','practice');
      user.addItemInList('cricket','batting');
      user.removeItemFromList('cricket','Item1');
      assert.deepEqual(user.getAllToDo(),{
        'cricket':{'title':'cricket','description':'to play','counter':0,'items':{}},
        'study':{'title':'study','description':'practice','counter':0,'items':{}}
      })
    })
  })

  describe('getObjectiveOfItemInList',()=>{
    it('Should return objective of item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('cricket','batting');
      assert.deepEqual(user.getObjectiveOfItemInList('cricket','Item1'),'batting');
    })
  })

  describe('getStatusOfItemInList',()=>{
    it('Should return status of item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('cricket','batting');
      assert.deepEqual(user.getStatusOfItemInList('cricket','Item1'),false);
    })
  })

  describe('changeItemObjective',()=>{
    it('Should change objective of item in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('cricket','batting');
      user.changeItemObjective('cricket','Item1','bowling');
      assert.deepEqual(user.getObjectiveOfItemInList('cricket','Item1'),'bowling');
    })
  })

  describe('markItemDoneInList',()=>{
    it('Should mark item as done in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('cricket','batting');
      user.markItemDoneInList('cricket','Item1');
      assert.equal(user.getStatusOfItemInList('cricket','Item1'),true);
    })
  })

  describe('markItemNotDoneInList',()=>{
    it('Should mark item as not done in any particular list',()=>{
      user.addNewToDo('cricket','to play');
      user.addItemInList('cricket','batting');
      user.markItemDoneInList('cricket','Item1');
      user.markItemNotDoneInList('cricket','Item1');
      assert.equal(user.getStatusOfItemInList('cricket','Item1'),false);
    })
  })
})
