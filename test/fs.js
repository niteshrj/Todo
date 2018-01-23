class Fs{
  constructor(contents){
    this._contents = contents;
  }
  appendFile(){

  }
  writeFileSync(filePath){

  }
  existsSync(filePath){
    return filePath=='./data/data.json';
  }
  readFileSync(filePath,encoding){
    if(this.existsSync(filePath) && encoding=='utf8'){
      return JSON.stringify(this._contents);
    }
  }
}
module.exports = Fs;
