let DefaultHandler = require('./defaultHandler.js');

class PostLogoutHandler extends DefaultHandler{
  constructor() {
    super()
  }
  execute(req,res){
    res.redirect('./index.html');
    res.end();
  }
}

module.exports = PostLogoutHandler;
