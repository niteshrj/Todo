let assert = require('chai').assert;
let ToDoApp = require('../src/toDoApp.js');

describe('ToDoApp',()=>{

  describe('getAllUser',()=>{
    it('Should return all users of the app',()=>{
      let toDoApp = new ToDoApp();
      assert.deepEqual(toDoApp.getAllUser(),{});
    })
  })

  describe('addNewUser',()=>{
    it('Should add new user in app',()=>{
      let toDoApp = new ToDoApp();
      toDoApp.addNewUser('aditi','aditi123');
      assert.deepEqual(toDoApp.getAllUser(),{'User1':
      {'counter':0,'name':'aditi','password':'aditi123','toDos':{}}})
    })
  })

  describe('deleteUser',()=>{
    it('Should delete existing user from app',()=>{
      let toDoApp = new ToDoApp();
      toDoApp.addNewUser('aditi','aditi123');
      toDoApp.addNewUser('asha','asha321');
      toDoApp.deleteUser('User1');
      assert.deepEqual(toDoApp.getAllUser(),{'User2':
      {'counter':0,'name':'asha','password':'asha321','toDos':{}}})
    })
  })

  describe('getNoOfUser',()=>{
    it('Should return no of users in the app',()=>{
      let toDoApp = new ToDoApp();
      toDoApp.addNewUser('aditi','aditi123');
      toDoApp.addNewUser('asha','asha321');
      assert.deepEqual(toDoApp.getNoOfUser(),2);
    })
  })
})
