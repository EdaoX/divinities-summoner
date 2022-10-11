const { debug } = require('./utilities');

const { FILTER_BLASPHEMY, BLASPHEMY_FREE_CHAT_IDS } = require('./config');

const isSafe = ctx => !FILTER_BLASPHEMY || !BLASPHEMY_FREE_CHAT_IDS.includes(ctx.chat.id.toString());

const makeSafe = fn => async ctx => {
    if(isSafe(ctx)) {
        await fn(ctx);
    } else {
        console.warn(`Unsafe request`, ctx.chat);
        debug.warn({
            deniedIds : BLASPHEMY_FREE_CHAT_IDS,
            filtered  : FILTER_BLASPHEMY,
            checked : ctx.chat.id.toString(),
            isInDeniedList : BLASPHEMY_FREE_CHAT_IDS.includes(ctx.chat.id.toString())
        });
    }
}

module.exports = { makeSafe, isSafe };