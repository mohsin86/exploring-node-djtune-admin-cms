
// define constructor function that gets `io` send to it
module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('sending message', (message) => {
            console.log('Message is received :', message);
            //io.sockets.emit('new message', {message: message});
            io.sockets.emit('new message', {message: message});
        });
    });
};

