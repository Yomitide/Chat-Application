'use strict';
const express = require ('express');
const logger = require('morgan');
const http = require('http');
const{Server} = require("socket.io");


const app = express ();
const server = http.createServer(app);
const io = new Server(server)



//Middleware declaration
app.use (express.json ());
app.use (express.urlencoded ({extended: true}));
app.use(logger('common'))


//Socket Connection
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
});
socket.on('disconnect', ()=> {
    console.log('user disconnected');
});
});


const port = process.env.port || 3000
server.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});