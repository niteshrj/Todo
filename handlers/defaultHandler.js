let registered_users = [{'userName':'aditi','password':'aditi123'}];
let User = require('../src/user.js');
let user = new User('aditi','adu');

class DefaultHandler {
  constructor() {
    this.user = user;
    this.registered_users = registered_users;
  }
  execute(){}
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = DefaultHandler;
