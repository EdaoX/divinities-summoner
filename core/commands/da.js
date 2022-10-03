const axios = require('axios');

const { createCommand } = require('./index');
const { createHelpText } = require('./help');
const { pickRandomFromArray, censor } = require('../utilities');
const divinities = require('../data/divinities');
const animals = require('../data/animals');

const blasphemyGeneratorUrl = 'https://blasphemy-generator.cyclic.app/blasphemy';

const composePair = (divinities, animals) => `${pickRandomFromArray(divinities)} ${pickRandomFromArray(animals)}`;

module.exports.commands = [];

const daCommand = 'da';
const daHandler = ctx => ctx.reply(composePair(divinities, animals));
const daHelpText = createHelpText(daCommand, 'Invoca una divinità');
module.exports.commands.push(createCommand(daCommand, daHandler, daHelpText));

const dacCommand = 'dac';
const dacHandler = ctx => ctx.reply(censor(composePair(divinities, animals)));
const dacHelpText = createHelpText(dacCommand, 'Invoca una divinità censurata');
module.exports.commands.push(createCommand(dacCommand, dacHandler, dacHelpText));

const sdaCommand = 'sda';
const sdaHandler = async ctx => {
    const { data : { blasphemy } = {}} = await axios.get(blasphemyGeneratorUrl);
    if(blasphemy) {
        ctx.reply(blasphemy);
    }
};
const sdaHelpText = createHelpText(sdaCommand, 'Invoca una divinità articolata');
module.exports.commands.push(createCommand(sdaCommand, sdaHandler, sdaHelpText));
