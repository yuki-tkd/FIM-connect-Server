var ws = new window.WebSocket('ws://133.16.123.101/',['echo-protocol','soap', 'xmpp']);
ws.onopen = function() {//WS接続確立
   ws.send('hello hoge');
 };
// Log errors
ws.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};
// Log messages from the server
ws.onmessage = function (e) {
  console.log('Server: ' + e.data);
};
