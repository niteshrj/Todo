const chai = require('chai');
const assert = chai.assert;
const request = require('./requestSimulator.js');
const th = require('./testHelper.js');
const app = require('../app.js');
const Fs = require('./fs.js');
let contents = require('./contents.js').dummyData();

let fs = new Fs(contents)
app.fs = fs;

const getSessionId = function(res){
  return res['headers']['Set-Cookie'].split("=")[1];
}
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
    it('redirects to login',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to home for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'name=Aditi&password=1'},res=>{
        th.should_be_redirected_to(res,'/home');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'name=badUser&password=1'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('if logged in,redirects to home',done=>{
      request(app,{method:'POST',url:'/login',body:'name=Aditi&password=1'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/',headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.should_be_redirected_to(res,'/home');
        })
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('if logged in,redirects to home',done=>{
      request(app,{method:'POST',url:'/login',body:'name=Aditi&password=1'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/login',headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.should_be_redirected_to(res,'/home');
        })
        done();
      })
    })
  })
  describe('GET /login.html',()=>{
    it('it should show the login page',done=>{
      request(app,{method:'GET',url:'/login'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login Here');
        done();
      })
    })
  })
  describe('GET /home.html',()=>{
    it('if not logged in, should redirect to login page',done=>{
      request(app,{method:'GET',url:'/home'},(res)=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('POST /logout',()=>{
    it('redirects to login page',done=>{
      request(app,{method:'POST',url:'/login',body:'name=Aditi&password=1'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'POST',url:'/logout',headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.should_be_redirected_to(res,'/login');
          th.should_not_have_cookie(res,'message');
        })
      done();
      })
    })
  })
  describe('POST /onDataRequest',()=>{
    it('if logged in',done=>{
      request(app,{method:'POST',url:'/login',body:'name=Aditi&password=1'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'POST',url:'/onDataRequest',body:`title=${""}&description=${""}`,headers:{cookie:`sessionid=${sessionid}`}},res=>{
          let body = res.body;
          body = JSON.parse(res.body);
          assert.deepEqual(body,contents['Aditi']['_todos']);
        })
        done();
      })
    })
  })
})
