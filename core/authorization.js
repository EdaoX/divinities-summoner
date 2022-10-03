const { debug } = require('./utilities');

const { ALLOWED_CHAT_IDS, RESTRICT_ACCESS } = require('../core/config');

const isAuthorized  = ctx => ALLOWED_CHAT_IDS.includes(ctx.chat.id.toString());

const makeAuthorized = fn => async ctx => {
    if(!RESTRICT_ACCESS || isAuthorized(ctx)) {
        await fn(ctx);
    } else {
        console.warn(`Unauthorized request`, ctx.chat);
        debug.warn({
            allowed : ALLOWED_CHAT_IDS,
            restricted  : RESTRICT_ACCESS,
            checked : ctx.chat.id.toString(),
            contained : ALLOWED_CHAT_IDS.includes(ctx.chat.id.toString())
        });
    }
}

module.exports = { isAuthorized, makeAuthorized };