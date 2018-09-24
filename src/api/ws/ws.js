function socketFn(io) {
    var socketData = {};
    socketData.usersInChat = [];
    socketData.rooms = {};

    function socketConnectionFn(socket) {

        socket.on('c:enter-client-page', function(data) {
            socket.join(data.roomId); 
            socketData.rooms = addRoom(socketData.rooms, data.roomId);
            socketData.rooms = cleanRooms(socketData.rooms, data.roomId);

            io.in(data.roomId).emit('s:enter-client-page', { userId: socket.id, roomId: data.roomId });

            console.log('Add ROOMS:');
            console.log(socketData.rooms);
        });

        socket.on('c:leave-client-page', function(data) {
            socketData.rooms = removeRoom(socketData.rooms, data.roomId);

            io.in(data.roomId).emit('s:leave-client-page', data);

            console.log('Remove ROOMS:');
            console.log(socketData.rooms);
        });

        function cleanRooms(rooms, newRoomId) {
            Object.keys(rooms).forEach(function(key) {
                if(key !== newRoomId && key[newRoomId].length) {
                    delete rooms[key];
                }
            });
            return rooms;
        }

        function addRoom(rooms, newRoomId) {
            if(!rooms[newRoomId]) {
                rooms[newRoomId] = [];
            } 
            return rooms;
        }

        function removeRoom(rooms, deleteRoomId) {
            if(rooms[deleteRoomId] && rooms[deleteRoomId].length === 0) {
                delete rooms[deleteRoomId];
            }
            return rooms;
        }

        function addUser(rooms, roomId, newUserId) {
            if(!rooms[roomId].includes(newUserId)) {
                rooms[roomId].push(newUserId);
            }
            return rooms;
        }

        function removeUser(rooms, roomId, removeUserId) {
            rooms = rooms[roomId].filter(function(user) {
                return user !== removeUserId;
            });
            return rooms;
        }















        // var currentUser = null;

        // socket.on('c:join', function(username) {
        //     var userFound = socketData.usersInChat.find(userExists);
        //     if(!userFound) {
        //         currentUser = username;
        //         io.emit('s:user-joined', currentUser);
        
        //         socketData.usersInChat.push(currentUser);
        //         io.emit('s:users-list', socketData.usersInChat);
        //     } else {
        //         io.emit('s:error', 'User exists');
        //     }

        //     function userExists(userInChat) {
        //         return userInChat === username;
        //     }
        // });
        
        // socket.on('c:message', function(msg){
        //     io.emit('s:message', {
        //         username: currentUser,
        //         msg: msg
        //     });
        // });

        // socket.on('c:user-is-typing', function() {
        //     io.emit('s:user-is-typing', currentUser);
        // })

        // socket.on('c:disconnect', function() {
        //     io.emit('s:user-left', currentUser);
        //     socketData.usersInChat = socketData.usersInChat.filter(function(userInChat){
        //         return userInChat !== currentUser;
        //     });
        //     currentUser = null;
        //     io.emit('s:users-list', socketData.usersInChat);
        // });
    }

    return socketConnectionFn;
}

module.exports = {
    socketFn: socketFn
}