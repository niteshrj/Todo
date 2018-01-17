let assert = require('chai').assert;
let TodoApp = require('../src/toDoApp.js');

describe('TodoApp',()=>{

  describe('getAllUsers',()=>{
    it('Should return all users of the app',()=>{
      let toDoApp = new TodoApp();
      assert.deepEqual(toDoApp.getAllUsers(),{});
    })
  })

  describe('addNewUser',()=>{
    it('Should add new user in app',()=>{
      let toDoApp = new TodoApp();
      toDoApp.addNewUser('aditi','aditi123');
      assert.deepEqual(toDoApp.getAllUsers(),{'aditi':
      {'counter':0,'name':'aditi','password':'aditi123','toDos':{}}})
    })
  })

  describe('deleteUser',()=>{
    it('Should delete existing user from app',()=>{
      let toDoApp = new TodoApp();
      toDoApp.addNewUser('aditi','aditi123');
      toDoApp.addNewUser('asha','asha321');
      toDoApp.deleteUser('aditi');
      assert.deepEqual(toDoApp.getAllUsers(),{'asha':
      {'counter':0,'name':'asha','password':'asha321','toDos':{}}})
    })
  })

  describe('getNoOfUsers',()=>{
    it('Should return no of users in the app',()=>{
      let toDoApp = new TodoApp();
      toDoApp.addNewUser('aditi','aditi123');
      toDoApp.addNewUser('asha','asha321');
      assert.deepEqual(toDoApp.getNoOfUsers(),2);
    })
  })
})
