"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var debugModule = require("debug");
var http = require("http");
var debug = debugModule('node-express-typescript:server');
// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3000');
app_1.default.set('port', port);
// create server and listen on provided port (on all network interfaces).
var server = http.createServer(app_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
var webSocketServer = require('websocket').server;
var wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
//TODO: Check the origin
function originIsAllowed(origin) {
    console.log(origin);
    return true;
}
var clients = [];
wsServer.on('request', function (request) {
    console.log(request);
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    var connection = request.accept('json', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    clients.push(connection);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
function sendAllClients(id, status) {
    clients.forEach(function (con) {
        try {
            con.sendUTF("Sensor " + id + " " + status);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.sendAllClients = sendAllClients;
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
//# sourceMappingURL=www.js.map