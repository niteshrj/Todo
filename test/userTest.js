let assert = require('chai').assert;
let User = require('../src/user.js');

describe('User',()=>{

  describe('User Name',()=>{
    it('getUserName() should return the name of user',()=>{
      let user = new User('aditi','aditi123');
      assert.equal(user.getUserName(),'aditi');
    })
  })

  describe('User Password',()=>{
    it('getUserPassword() should return the password of user',()=>{
      let user = new User('aditi','aditi123');
      assert.equal(user.getUserPassword(),'aditi123');
    })
  })

  describe('User All To Do',()=>{
    it('getAllToDo() should return the all To Do of user',()=>{
      let user = new User('aditi','aditi123');
      assert.deepEqual(user.getAllToDo(),[]);
    })
    it('addNewToDo() should add new To Do in user account',()=>{
      let user = new User('aditi','aditi123');
      user.addNewToDo('cricket','to play');
      assert.deepEqual(user.getAllToDo(),[{'title':'cricket','description':'to play',
      'counter':0,'items':{}}]);
    })
  })
})
