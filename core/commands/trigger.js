const { createCommand } = require('./index');
const { createHelpText } = require('./help');
const { getNextFridayDate, splitSecondsToTimeParts, getNext19Date } = require('../utilities');

module.exports.commands = [];

const teamCommand = 'triggerteam';
const teamHandler = ctx => {
    const nextFriday = getNextFridayDate();
    const now = new Date();
    const secondsBetweenDates = (nextFriday - now) / 1000;
    
    const { hours, minutes, seconds } = splitSecondsToTimeParts(secondsBetweenDates);

    ctx.reply(`Mancano SOLO ${hours} ore, ${minutes} minuti e ${seconds} secondi a Venerdì!`);
};
const teamHelpText = createHelpText(teamCommand, 'Infastidisce tutto il team');
module.exports.commands.push(createCommand(teamCommand, teamHandler, teamHelpText));

const luigiCommand = 'triggerluigi';
const luigiHandler = ctx => {
    const next19 = getNext19Date();
    const now = new Date();
    const secondsBetweenDates = (next19 - now) / 1000;
    
    const { hours } = splitSecondsToTimeParts(secondsBetweenDates);

    ctx.reply(`Dai, che anche oggi tra APPENA ${hours} ore saremo a casa!`);
};
const luigiHelpText = createHelpText(luigiCommand, 'Infastidisce Luigi');
module.exports.commands.push(createCommand(luigiCommand, luigiHandler, luigiHelpText));