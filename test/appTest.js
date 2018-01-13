let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let testHelper = require('./testHelper.js');
let app = require('../server.js');


describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        testHelper.should_be_redirected_to(res,'/index.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('it should show the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},(res)=>{
        testHelper.status_is_ok(res);
        testHelper.body_contains(res,'TO-DO-LIST');
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
  describe('GET /homePage.html',()=>{
    it('it should show the home page',done=>{
      request(app,{method:'GET',url:'/homePage.html'},(res)=>{
        testHelper.status_is_ok(res);
        testHelper.body_contains(res,'Your Existing To Do Lists');
        done();
      })
    })
  })
  describe('GET /toDoPage.html',()=>{
    it('it should show the toDoPage page',done=>{
      request(app,{method:'GET',url:'/toDoPage.html'},(res)=>{
        testHelper.status_is_ok(res);
        testHelper.body_contains(res,'Write down your items below :-');
        done();
      })
    })
  })
})
