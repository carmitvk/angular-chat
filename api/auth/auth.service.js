const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');


async function login(userName, password, id) {
    logger.debug(`auth.service - login with userName: ${userName}, id: ${id}`);
    if(id) {
        const user = await userService.getById(id);
        if (!user) return Promise.reject('Invalid user ID');
        delete user.password;
        return user;
    } else {
        const user = await userService.getByUsername(userName);
        if (!user) return Promise.reject('Invalid userName');
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            return Promise.reject('Invalid password');
        }
        delete user.password;
        return user;
    }
}

async function signup(userName, password, nickName) {
    const saltRounds = 10;

    logger.debug(`auth.service - signup with userName: ${userName}, nickName: ${nickName}`);
    if (!userName || !password || !nickName ){
        return Promise.reject('nickName, userName and password are required!');
    }
    // check if the user already exist
    const user = await userService.getByUsername(userName);
    if (user){
        return Promise.reject('Username already exist');
    } 

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ userName, password: hash, nickName });
}

module.exports = {
    signup,
    login,
}