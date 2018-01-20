const reply_click = function(event){
  console.log(event.target.id);
  let method = 'POST';
  let url = '/onDelete';
  let data = 'id='  + event.target.id;
  sendRequest(method,url,callback,data);
}

const callback = function(){
  let text = this.responseText;
  text = JSON.parse(text);
  let buttonId = 0;
  text.forEach((todo)=>{
    let title = document.createElement('a');
    let description = document.createElement('p');
    let br = document.createElement('br');
    let button = document.createElement('BUTTON');
    button.id=buttonId;
    buttonId++;
    button.innerText = 'Delete'
    button.onclick = reply_click;
    title.setAttribute('href','https://www.google.com');
    title.innerText = todo.title;
    description.innerText = todo.description;
    document.getElementById('div').appendChild(title);
    document.getElementById('div').appendChild(description);
    document.getElementById('div').appendChild(button);
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
