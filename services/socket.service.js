
//npm i socket.io@4.1.3

const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');


var gIo = null;
var gSocketBySessionIdMap = {};
var usersPerRoomMap = {};

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origins: ['http://localhost:4200']
        }
    });

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', (socket) => {
        //console.log('socket.handshake', socket.handshake)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket;
        // TODO: emitToUser feature - need to tested 
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected');
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null;
            }
            if (socket.roomId) {
                socket.leave(socket.roomId);
                removeUserFromRoomMap(socket.user, socket.roomId);
                gIo.to(socket.roomId).emit('users-in-room', usersPerRoomMap[socket.roomId]);
            }
        })

        socket.on('join-to-room', data => {
            console.log('join-to-room', data);
            if (socket.roomId === data.roomId) {
                return;
            }
            if (socket.roomId) {
                socket.leave(socket.roomId);
                removeUserFromRoomMap(data.user, socket.roomId);
                gIo.to(socket.roomId).emit('users-in-room', usersPerRoomMap[socket.roomId]);
            }
            socket.join(data.roomId);
            socket.roomId = data.roomId;
            socket.user = data.user;
            addUserToRoomMap(data.user, socket.roomId);
            gIo.to(socket.roomId).emit('users-in-room', usersPerRoomMap[socket.roomId]);
        })

        socket.on('user-typing', user => {
            gIo.to(socket.roomId).emit('typer', user);
        })

        socket.on('message', msg => {
            console.log('got message', msg);
            gIo.to(msg.roomId).emit('new-message', msg);
        })

    })
}

function addUserToRoomMap(user, roomId) {
    let usersInRoom = usersPerRoomMap[roomId] || [];
    usersInRoom = usersInRoom.filter(userInRoom => userInRoom.id !== user.id);
    usersPerRoomMap[roomId] = [...usersInRoom, user];
}

function removeUserFromRoomMap(user, roomId) {
    if (usersPerRoomMap[roomId]) {
        usersPerRoomMap[roomId] = usersPerRoomMap[roomId].filter(userInRoom => userInRoom.id !== user.id)
    }
}

function emit({ type, data }) {
    gIo.emit(type, data);
}

// TODO: Need to test emitToUser feature
function emitToUser({ type, data, userId }) {
    gIo.to(userId).emit(type, data);
}


// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore();
    const { sessionId } = store;
    if (!sessionId) {
        return logger.debug('no sessionId in asyncLocalStorage store');
    }
    const excludedSocket = gSocketBySessionIdMap[sessionId];
    if (!excludedSocket) {
        return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap);
    }
    excludedSocket.broadcast.emit(type, data);
}


module.exports = {
    connectSockets,
    emit,
    broadcast
}