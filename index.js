const { TELEGRAM_BOT_API_KEY, LAUNCH_CONFIG } = require('./core/config');
const { makeAuthorized } = require('./core/authorization');
const { Telegraf } = require('telegraf');
const { commands } = require('./core/commands');
const { command : helpCommand } = require('./core/commands/help');
const { makeSafe } = require('./core/safeFilter');

const bot = new Telegraf(TELEGRAM_BOT_API_KEY);

bot.start(ctx => ctx.reply(`Benvenuto su Divinities Summoner. Per una lista di comandi disponibili utilizza /${helpCommand}`));

for(const {command, handler, sfw} of commands) {
    if(!sfw) {
        bot.command(command, makeAuthorized(makeSafe(handler)));
    } else {
        bot.command(command, makeAuthorized(handler));
    }
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

bot.launch(LAUNCH_CONFIG);