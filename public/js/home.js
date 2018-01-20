const callback = function(){
  let text = this.responseText;
  console.log(text);
  text = JSON.parse(text);
  text.forEach((ele)=>{
    let link = document.createElement('a');
    let br = document.createElement('br');
    link.setAttribute('href','https://www.google.com');
    link.innerText = ele.title;
    document.getElementById('div').appendChild(link);
    document.getElementById('div').appendChild(br);
  })
}

const loadData = function(){
  let method = 'POST';
  let url = '/onDataRequest';
  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  let data = `title=${title}&description=${description}`;
  sendRequest(method,url,callback,data);
}

const sendRequest = function(method,url,callback,data){
  let xReq = new XMLHttpRequest();
  xReq.open(method,url);
  xReq.addEventListener('load',callback);
  xReq.send(data);
}

window.onload = loadData;
