const { createCommand } = require('./index');
const { createHelpText } = require('./help');

const warFactGenerator = require('../string-generation/war-fact-generator');

module.exports.commands = [];

const command = 'warfact';
const handler = ctx => {
    const fact = warFactGenerator.generate();
    ctx.reply(fact);
};
const helpText = createHelpText(command, 'Genera un fatto di guerra veritiero')
module.exports.commands.push(createCommand(command, handler, helpText));