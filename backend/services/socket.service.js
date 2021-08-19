
//npm i socket.io@2.2.0

const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');


var gIo = null;
var gSocketBySessionIdMap = {};

function connectSockets(http, session) {
    gIo = require('socket.io')(http);

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // console.log('socket.handshake', socket.handshake)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket;
        // TODO: emitToUser feature - need to tested 
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected');
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null;
            }
        })

        socket.on('userId', data => {
            console.log('on to userId',data.userId);
            if (socket.userId === data.userId){
                return;
            }
            if (socket.userId) {
                socket.leave(socket.userId);
            }
            socket.join(data.userId);
            socket.userId = data.userId;
            socket.nickName = data.nickName;
        })


        socket.on('msg-data', msg => {
            msg.from = socket.nickName;
            msg.fromId = socket.userId;
            msg.createdAt = Date.now();
            gIo.to(socket.userId).emit('msg-data', msg);
            gIo.to(msg.toId).emit('msg-data', msg);
        })

        socket.on('user-typing', data => {
            gIo.to(data.toId).emit('user-typing', data);
        })

    })
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
    if (!sessionId){
        return logger.debug('no sessionId in asyncLocalStorage store');
    }
    const excludedSocket = gSocketBySessionIdMap[sessionId];
    if (!excludedSocket){
        return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap);
    }
    excludedSocket.broadcast.emit(type, data);
}


module.exports = {
    connectSockets,
    emit,
    broadcast
}