
const logger = require('../../services/logger.service')
const service = require('./user.by-file.service');

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}
// userName, password, id

async function query(filterBy = {}) {
    return service.query(filterBy);
}

async function getById(userId) {
    return service.getById(userId);
}

async function getByUsername(userName) {
    return service.getByUsername(userName);
}

async function remove(userId) {
    return service.remove(userId);
    // try {
    //     const collection = await dbService.getCollection('user');
    //     await collection.deleteOne({ 'id': ObjectId(userId) });
    // } catch (err) {
    //     logger.error(`cannot remove user ${userId}`, err);
    //     throw err;
    // }
}

async function update(user) {
    return service.update(user);
}

async function add(newUser) {
    const user = await service.add(newUser);
    return user;
}


