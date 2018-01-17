let DefaultHandler = require('./defaultHandler.js');

class PostLoginHandler extends DefaultHandler{
  constructor() {
    super()
  }
  execute(req,res){
    let validUser = this.user.registered_users.find((u)=>
    {u.userName==req.body.username});
    if(!validUser){
      res.setHeader('Set-Cookie','loginFailed=true');
      res.redirect('/login');
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    res.redirect('/homePage.html');
  }
}

module.exports = PostLoginHandler;
