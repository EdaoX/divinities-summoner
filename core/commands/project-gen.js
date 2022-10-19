const { createCommand } = require('./index');
const { createHelpText } = require('./help');

const projectGenerator = require('../string-generation/project-generator');

module.exports.commands = [];

const command = 'progetto';
const handler = ctx => {
    const fact = projectGenerator.generate();
    ctx.reply(fact);
};
const helpText = createHelpText(command, 'Genera la descrizione di un nuovo progetto')
module.exports.commands.push(createCommand(command, handler, helpText));