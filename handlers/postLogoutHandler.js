let DefaultHandler = require('./defaultHandler.js');

class PostLogoutHandler extends DefaultHandler{
  constructor() {
    super()
  }
  execute(req,res){
    res.setHeader('Set-Cookie', [`sessionid=0`]);
    if (req.user) delete req.user.sessionid;
    res.redirect('./index.html');
    res.end();
  }
}

module.exports = PostLogoutHandler;
