let DefaultHandler = require('./defaultHandler.js');
let fs = require('fs');

class StaticFileHandler extends DefaultHandler{
  constructor(root) {
    super()
    this.root = root;
  }
  getFilePath(url){
    return `./${this.root}${url}`;
  }
  execute(req,res){
    if(req.url=='/'||req.url=='/login'){
      req.url='/login.html';
    }
    let data = fs.readFileSync(this.getFilePath(req.url),'utf8');
    res.write(data);
    res.end();
  }
}

module.exports = StaticFileHandler;
