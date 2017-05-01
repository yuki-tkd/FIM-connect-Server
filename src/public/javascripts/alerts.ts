let url = 'ws://' + location.host;
console.log(url);
var ws = new WebSocket(url, ['echo-protocol','json']);
//var ws = new WebSocket(url, []);
ws.onopen = function() {
   //ws.send('hello hoge');
 };
// Log errors
ws.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};
// Log messages from the server
ws.onmessage = function (e) {
  console.log('Server: ' + e.data);
  document.getElementById('alert').innerHTML = e.data;
};

setTimeout("location.reload()", 1000);
