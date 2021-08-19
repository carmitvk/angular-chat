const logger = require('../../services/logger.service');
const fs = require('fs');
let apiInfoCached;

function apiInfo(req, res) {
  if (apiInfoCached) {
    res.send(apiInfoCached);
  } else {
    try {
      fs.readFile('build-info.json', 'utf8', function(err, data) {
        if (err) logger.error("Failed to load 'build-info.json' file content");

        apiInfoCached = data;
        res.send(apiInfoCached);
      });
    } catch (err) {
      logger.error('Failed to read \'build-info.json\' file', err);
      res.status(500).send({ err: 'Failed to read \'build-info.json\' file', msg: err });
    }
  }
}

module.exports = {
  apiInfo,
};
