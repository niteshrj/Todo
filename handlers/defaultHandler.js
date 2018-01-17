let registered_users = [{'userName':'aditi','password':'aditi123'},
{'userName':'asha','password':'asha321'}];
let User = require('../src/user.js');
let user = new User('aditi','adu');
user.registered_users = registered_users;

class DefaultHandler {
  constructor() {
    this.user = user;
  }
  execute(){}
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = DefaultHandler;
