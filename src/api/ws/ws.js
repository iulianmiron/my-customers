function socketFn(io) {
    var socketData = {};
    socketData.usersInChat = [];

    function socketConnectionFn(socket) {
        var currentUser = null;

        socket.on('c:join', function(username) {
            var userFound = socketData.usersInChat.find(userExists);
            if(!userFound) {
                currentUser = username;
                io.emit('s:user-joined', currentUser);
        
                socketData.usersInChat.push(currentUser);
                io.emit('s:users-list', socketData.usersInChat);
            } else {
                io.emit('s:error', 'User exists');
            }

            function userExists(userInChat) {
                return userInChat === username;
            }
        });
        
        socket.on('c:message', function(msg){
            io.emit('s:message', {
                username: currentUser,
                msg: msg
            });
        });

        socket.on('c:user-is-typing', function() {
            io.emit('s:user-is-typing', currentUser);
        })

        socket.on('c:disconnect', function() {
            io.emit('s:user-left', currentUser);
            socketData.usersInChat = socketData.usersInChat.filter(function(userInChat){
                return userInChat !== currentUser;
            });
            currentUser = null;
            io.emit('s:users-list', socketData.usersInChat);
        });
    }

    return socketConnectionFn;
}

module.exports = {
    socketFn: socketFn
}