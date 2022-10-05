const axios = require('axios');
const { createCommand } = require('./index');
const { createHelpText } = require('./help');
const dpcmGeneratorUrl = 'https://dpcm-generator.herokuapp.com/dpcm';

module.exports.commands = [];

const command = 'dpcm';
const handler = async ctx => {
    const { data : { dpcm } } = await axios.get(dpcmGeneratorUrl);
    if(dpcm) {
        await ctx.reply(dpcm);
    }
};
const help = createHelpText(command, 'Genera un nuovo DPCM');
module.exports.commands.push(createCommand(command, handler, help));