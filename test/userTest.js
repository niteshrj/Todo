let assert = require('chai').assert;
let User = require('../src/user.js');

describe('User',()=>{

  describe('getName',()=>{
    it('should return the name of user',()=>{
      let user = new User('aditi','aditi123');
      assert.equal(user.getName(),'aditi');
    })
  })

  describe('getPassword',()=>{
    it('should return the password of user',()=>{
      let user = new User('aditi','aditi123');
      assert.equal(user.getPassword(),'aditi123');
    })
  })

  describe('getAllToDo',()=>{
    it('should return the all To Do of user',()=>{
      let user = new User('aditi','aditi123');
      assert.deepEqual(user.getAllToDo(),[]);
    })
  })

  describe('addNewToDo',()=>{
    it('should add new To Do in user account',()=>{
      let user = new User('aditi','aditi123');
      user.addNewToDo('cricket','to play');
      assert.deepEqual(user.getAllToDo(),[{'title':'cricket','description':'to play',
      'counter':0,'items':{}}]);
    })
  })

})
