const callback = function(data){
  let text = this.responseText || data;
  text = JSON.parse(text);
  text.forEach((todo)=>{
    let title = document.createElement('a');
    let description = document.createElement('p');
    let br = document.createElement('br');
    title.setAttribute('href','https://www.google.com');
    title.innerText = todo.title;
    description.innerText = todo.description;
    document.getElementById('div').appendChild(title);
    document.getElementById('div').appendChild(description);
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
