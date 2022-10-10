const { createCommand } = require('./index');
const { isSafe } = require('../safeFilter');

const command = 'help';

const createHelpCommand = commands => {
    const handler = ctx => {
        if(isSafe(ctx)) {
            ctx.reply(commands.map(command => command.helpText).join('\n'))
        } else {
            ctx.reply(commands.filter(command => command.sfw).map(command => command.helpText).join('\n'))
        }
    };
    const help = createHelpText(command, 'Consulta la lista di comandi disponibili');
    return createCommand(command, handler, help);
}

const createHelpText = (command, text) => `/${command} - ${text}`;

module.exports = { createHelpCommand, command, createHelpText };