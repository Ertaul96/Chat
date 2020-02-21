const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function(request, respons) {
    respons.sendFile(__dirname + '/index.html');
});

connections = [];

<!-- Добавление сокета в массив при подключении к сайту -->
io.sockets.on('connection', function(socket) {
    console.log("Пользователь подключился");
    connections.push(socket);

    <!-- Удаление сокета из массива при отключении от сайта -->
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Пользователь отключился");
    });

    socket.on('send', function (data) {
        io.sockets.emit('new mess', {mess: data.mess, name: data.name, className: data.className});
    });
});