const axios = require('axios');

const { createCommand } = require('./index');
const { createHelpText } = require('./help');
const { pickRandomFromArray, censor } = require('../utilities');
const divinities = require('../data/divinities');
const animals = require('../data/animals');
const { pexelsClient } = require('../config');

const blasphemyGeneratorUrl = 'https://blasphemy-generator.cyclic.app/blasphemy';

const composePair = (divinity, animal) => `${divinity} ${animal}`;
const composeRandomPair = (divinities, animals) => composePair(pickRandomFromArray(divinities), pickRandomFromArray(animals));

const getAnimalPictureUrl = async animal => {
    const requestData = {
        query : animal, 
        per_page: 1,
        locale : 'it-IT'
    };
    const response = await pexelsClient.photos.search(requestData);
    console.log('Pexel Response', response);
    const { photos : [ photo = {} ] = [] } = response;
    console.log('Photo', photo);
    const { src : { small : url } = {} } = photo;
    return url;
};

module.exports.commands = [];

const daCommand = 'da';
const daHandler = ctx => ctx.reply(composeRandomPair(divinities, animals));
const daHelpText = createHelpText(daCommand, 'Invoca una divinità');
module.exports.commands.push(createCommand(daCommand, daHandler, daHelpText));

const dacCommand = 'dac';
const dacHandler = ctx => ctx.reply(censor(composeRandomPair(divinities, animals)));
const dacHelpText = createHelpText(dacCommand, 'Invoca una divinità censurata');
module.exports.commands.push(createCommand(dacCommand, dacHandler, dacHelpText));

const daiCommand = 'dai';
const daiHandler = async ctx => {
    const divinity = pickRandomFromArray(divinities);
    const animal = pickRandomFromArray(animals);
    const caption = composePair(divinity, animal);
    
    const url = await getAnimalPictureUrl(animal);
        
    if(url) {    
        return await ctx.replyWithPhoto({url}, {caption});
    } else {
        return await ctx.reply(caption);
    }
};
const daiHelpText = createHelpText(daiCommand, 'Invoca una divinità illustrata');
module.exports.commands.push(createCommand(daiCommand, daiHandler, daiHelpText));

const sdaCommand = 'sda';
const sdaHandler = async ctx => {
    const { data : { blasphemy } = {}} = await axios.get(blasphemyGeneratorUrl);
    if(blasphemy) {
        ctx.reply(blasphemy);
    }
};
const sdaHelpText = createHelpText(sdaCommand, 'Invoca una divinità articolata');
module.exports.commands.push(createCommand(sdaCommand, sdaHandler, sdaHelpText));
