let DefaultHandler = require('./defaultHandler.js');

class PostLogoutHandler extends DefaultHandler{
  constructor() {
    super()
  }
  execute(req,res){
    res.setHeader('Set-Cookie', [`message=login failed; Max-Age=5`, `sessionid=0;Max-Age=5`]);
    if (req.user) delete req.user.sessionid;
    res.redirect('./index.html');
    res.end();
  }
}

module.exports = PostLogoutHandler;
