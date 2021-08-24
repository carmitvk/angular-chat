
const fs = require('fs');
const path = require("path");
const logger = require('../../services/logger.service');
const  filePath = path.resolve(__dirname, './../../data/users.json');
let users = [];


module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}
// // userName, password, id

 function readUsersFromFile() {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        logger.error(`Error reading file from disk: ${err}`);
      } else {
        try{
          // parse JSON string to JSON object
          users = JSON.parse(data);
        } catch (err) {
          logger.error('failed to load the users from file');
          users = [];
        }
      }

  });
}
readUsersFromFile();

function updateFile() {
  const data = JSON.stringify(users, null, 2);
  fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
        console.error(`Error writing file: ${err}`);
    } else {
        console.debug(`users file is written successfully!`);
    }
});

}

async function query(filterBy = {}) {
  return JSON.parse(JSON.stringify(users));
}

async function getById(userId) {
  let user = users.find(item => item.id === userId);

  return user ? {...user} : undefined;
}

async function getByUsername(userName) {
  let user = users.find(item => item.userName === userName);
  return user ? {...user} : undefined;
}

async function remove(userId) {
  users = users.filter((item) => {
    item.id === userId;
  });
  updateFile();
}

async function update(user) {
  let userIndex = users.findIndex((obj => obj.id == user.id));
  if(userIndex > -1){
    users[userIndex] = {...user};
    updateFile();
  }
}

async function add(user) {
  user.id = Date.now().toString();
  users.push({...user});
  await updateFile();
  return user;
}


