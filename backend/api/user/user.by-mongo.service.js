
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection('user');
        var users = await collection.find(criteria).toArray();
        users = users.map(user => {
            delete user.password;
            return user;
        });
        return users;
    } catch (err) {
        logger.error('cannot find users', err);
        throw err;
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user');
        const user = await collection.findOne({ '_id': ObjectId(userId) });
        delete user.password;
        return user;
    } catch (err) {
        logger.error(`while finding user ${userId}`, err);
        throw err;
    }
}

async function getByUsername(userName) {
    try {
        const collection = await dbService.getCollection('user');
        const user = await collection.findOne({ userName });
        return user;
    } catch (err) {
        logger.error(`while finding user ${userName}`, err);
        throw err;
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user');
        await collection.deleteOne({ '_id': ObjectId(userId) });
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err);
        throw err;
    }
}

async function update(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(user._id),
            userName: user.userName,
            nickName: user.nickName,
        }
        const collection = await dbService.getCollection('user');
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave });
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err);
        throw err;
    }
}

async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            userName: user.userName,
            password: user.password,
            nickName: user.nickName,
            createdAt: Date.now()
        }
        const collection = await dbService.getCollection('user');
        await collection.insertOne(userToAdd);
        return userToAdd;
    } catch (err) {
        logger.error('cannot insert user', err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
        criteria.$or = [
            {
                userName: txtCriteria
            },
            {
                nickName: txtCriteria
            }
        ]
    }
    return criteria;
}


