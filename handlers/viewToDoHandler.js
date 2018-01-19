let DefaultHandler = require('./defaultHandler.js');
let fs = require('fs');

class ViewToDoHandler extends DefaultHandler{
  constructor() {
    super()
  }
  execute(req,res){
    let homePage = fs.readFileSync('./public/homePage.html','utf8');
    res.write(homePage);
    res.end();
  }
}

module.exports = ViewToDoHandler;
