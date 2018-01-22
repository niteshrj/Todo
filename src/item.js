class Item {
  constructor(item) {
    this._item = item;
    this._status = false;
  }
  get _item(){
    return this._item;
  }
  get _status(){
    return this._status;
  }
  markDone(){
    this._status = true;
  }
  markUndone(){
    this._status = false;
  }
}

module.exports = Item;
