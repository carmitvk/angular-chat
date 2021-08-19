const authService = require('./auth.service');
const logger = require('../../services/logger.service');

async function login(req, res) {
    const { userName, password, id } = req.body;
    try {
        const user = await authService.login(userName, password, id);
        req.session.user = user;
        res.json(user);
    } catch (err) {
        logger.debug('Failed to Login ' + err);
        res.status(401).send({ err: 'Failed to Login', msg: err });
    }
}

async function signup(req, res) {
    try {
        const { userName, password, nickName } = req.body;

        await authService.signup(userName, password, nickName);
        return login(req, res);
        // logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
        // req.session.user = user;
        // res.json(user);
    } catch (err) {
        logger.error('Failed to signup ' + err);
        res.status(500).send({ err: 'Failed to signup', msg: err  });
    }
}

async function logout(req, res){
    try {
        req.session.destroy();
        res.send({ msg: 'Logged out successfully' });
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout', msg: err  });
    }
}

module.exports = {
    login,
    signup,
    logout
}