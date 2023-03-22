const { createCommand } = require('./index');
const { createHelpText } = require('./help');

const dpcmGenerator = require('../string-generation/dpcm-generator')

module.exports.commands = [];

const command = 'dpcm';
const handler = ctx => {
    const dpcm = dpcmGenerator.generate();
    ctx.reply(dpcm);
};
const help = createHelpText(command, 'Genera un nuovo DPCM');
module.exports.commands.push(createCommand(command, handler, help));