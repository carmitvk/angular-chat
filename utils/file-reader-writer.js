const fs = require('fs');
const logger = require('../services/logger.service')

module.exports = {
  readFromFile,
  updateFile,
}

function readFromFile(filePath) {
  let fileData = fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) {
      logger.error(`Error reading file from disk: ${err}`);
    } else {
      const res = JSON.parse(data);
      return res;
    }
  });
  fileData = fileData instanceof Object ? fileData : JSON.parse(fileData);
  return fileData;
}

function updateFile(filePath, jsonObject) {
  const data = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(filePath, data, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      throw err;
    }
  });

}

