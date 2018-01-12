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
})
