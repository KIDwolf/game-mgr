const auth = require('./auth');
const inviteCode = require('./invite-code')
const game = require('./game');
const inventoryLog = require('./inventory-log');
const user = require('./user');
const character = require('./character');
const log = require('./log');


module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(game.routes());
    app.use(inventoryLog.routes());
    app.use(user.routes());
    app.use(character.routes());
    app.use(log.routes());
};