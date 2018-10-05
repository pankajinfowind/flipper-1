var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(3000);
io.on('connection',function(socket){
    console.log('Starting');
    var redisClient = redis.createClient();
        redisClient.subscribe('message');
        redisClient.on("message",function(channel, message){
        console.log('message',message);
        console.log('channel',channel);
        socket.emit(channel,message);
    });

    socket.on('disconnect',function(){
        redisClient.quit();
    });
});

//Launch the Server on port 3000

server.listen(3000,()=>{
    console.log(`server running on port 3000`);
    })
