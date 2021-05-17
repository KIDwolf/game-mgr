const auth = require('./auth');
const inviteCode = require('./invite-code')
const game = require('./game');

module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(game.routes());
};