const { createCommand } = require('./index');
const { createHelpText } = require('./help');

const rubberduckGenerator = require('../string-generation/rubberduck-generator');

const command = 'duck';
const handler = async ctx => {
    const generated = rubberduckGenerator.generate();
    await ctx.reply(generated);
};
const helpText = createHelpText(command, "Suggerimenti validi nei momenti di difficoltà");
module.exports.commands = [ createCommand(command, handler, helpText) ];