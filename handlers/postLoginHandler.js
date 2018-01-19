let DefaultHandler = require('./defaultHandler.js');
let registered_users = [{'userName':'aditi','password':11}];

class PostLoginHandler extends DefaultHandler{
  constructor() {
    super()
    this.registered_users = registered_users;
  }
  execute(req,res){
    let validUser = this.registered_users.find((u)=>u.userName==req.body.name);
    let validPassword = this.registered_users.find((u)=>u.password==req.body.password);
    if(!validUser || !validPassword){
      res.setHeader('Set-Cookie',`message=login Failed ; Max-Age=5`);
      res.redirect('/login.html');
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    validUser.sessionid = sessionid;
    res.redirect('/homePage.html');
  }
}

module.exports = PostLoginHandler;
