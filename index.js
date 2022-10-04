const { TELEGRAM_BOT_API, TELEGRAM_WEBHOOK_DOMAIN, TELEGRAM_WEBHOOK_PORT } = require('./core/config');
const { makeAuthorized } = require('./core/authorization');
const { Telegraf } = require('telegraf');
const { commands } = require('./core/commands');
const { command : helpCommand } = require('./core/commands/help');

const bot = new Telegraf(TELEGRAM_BOT_API);

bot.start(ctx => ctx.reply(`Benvenuto su Divinities Summoner. Per una lista di comandi disponibili utilizza /${helpCommand}`));

for(const {command, handler} of commands) {
    bot.command(command, makeAuthorized(handler));
}

bot.launch({
    webhook: {
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

        domain: TELEGRAM_WEBHOOK_DOMAIN,
    
        port: TELEGRAM_WEBHOOK_PORT,
    
        // Optional secret to be sent back in a header for security.
        // e.g.: `crypto.randomBytes(64).toString("hex")`
        //secretToken: randomAlphaNumericString,
    },
  });