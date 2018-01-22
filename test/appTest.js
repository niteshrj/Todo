let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let testHelper = require('./testHelper.js');
let app = require('../app.js');


describe('app',()=>{
  describe.skip('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        testHelper.should_be_redirected_to(res,'/login.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /login.html',()=>{
    it('it should show the login page',done=>{
      request(app,{method:'GET',url:'/login.html'},(res)=>{
        testHelper.status_is_ok(res);
        testHelper.body_contains(res,'Login Here');
        done();
      })
    })
  })
  describe.skip('GET /homePage.html',()=>{
    it('if not logged in, should redirect to login page',done=>{
      request(app,{method:'GET',url:'/homePage.html'},(res)=>{
      testHelper.redirect()
        done();
      })
    })
  })
  describe.skip('GET /toDoPage.html',()=>{
    it('it should show the toDoPage page',done=>{
      request(app,{method:'GET',url:'/toDoPage.html'},(res)=>{
        testHelper.status_is_ok(res);
        testHelper.body_contains(res,'Write down your items below :-');
        done();
      })
    })
  })
  describe.skip('GET /getAllToDo',()=>{
    it('it should show the all ToDo of the user',done=>{
      request(app,{method:'GET',url:'/getAllToDo'},(res)=>{
        testHelper.status_is_ok(res);
        done();
      })
    })
  })
})
