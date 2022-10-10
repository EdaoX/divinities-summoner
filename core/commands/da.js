const axios = require('axios');
const { Input } = require('telegraf');

const { createCommand } = require('./index');
const { createHelpText } = require('./help');
const { pickRandomFromArray, censor } = require('../utilities');
const divinities = require('../data/divinities');
const animals = require('../data/animals');
const { getAnimalPictureUrl : getAnimalPictureUrlFromPexels } = require('../../external-services/pexels-service');
const { getAnimalPictureUrl : getAnimalPictureUrlFromWikimedia } = require('../../external-services/wikimedia-service');
const { getAnimalPictureUrl : getAnimalPictureUrlFromGoogle } = require('../../external-services/serpapi/serpapi-service');
const { getAnimalGIFUrl } = require('../../external-services/tenor-service');

const blasphemyGeneratorUrl = 'https://blasphemy-generator.cyclic.app/blasphemy';

const composePair = (divinity, animal) => `${divinity} ${animal}`;
const composeRandomPair = (divinities, animals) => composePair(pickRandomFromArray(divinities), pickRandomFromArray(animals));

module.exports.commands = [];

const daCommand = 'da';
// const daHandler = async ctx => await ctx.reply(composeRandomPair(divinities, animals));
const daHandler = async ctx => await ctx.reply(composeRandomPair(divinities, animals));
const daHelpText = createHelpText(daCommand, 'Invoca una divinità');
module.exports.commands.push(createCommand(daCommand, daHandler, daHelpText, false));

const dacCommand = 'dac';
const dacHandler = async ctx => await ctx.reply(censor(composeRandomPair(divinities, animals)));
const dacHelpText = createHelpText(dacCommand, 'Invoca una divinità censurata');
module.exports.commands.push(createCommand(dacCommand, dacHandler, dacHelpText, false));

const daiCommand = 'dai';
const daiHandler = async ctx => {
    const divinity = pickRandomFromArray(divinities);
    const animal = pickRandomFromArray(animals);
    const caption = composePair(divinity, animal);
    
    const url = await getAnimalPictureUrlFromPexels(animal) ||  
        await getAnimalPictureUrlFromWikimedia(animal) || 
        await getAnimalPictureUrlFromGoogle(animal);
        
    if(url) {
        await ctx.replyWithPhoto(Input.fromURL(url), {caption});
    } else {
        await ctx.reply(caption);
    }
};
const daiHelpText = createHelpText(daiCommand, 'Invoca una divinità illustrata');
module.exports.commands.push(createCommand(daiCommand, daiHandler, daiHelpText, false));

const dagCommand = 'dag';
const dagHandler = async ctx => {
    const divinity = pickRandomFromArray(divinities);
    const animal = pickRandomFromArray(animals);
    const caption = composePair(divinity, animal);
    
    const url = await getAnimalGIFUrl(animal);
        
    if(url) {
        await ctx.replyWithVideo(Input.fromURL(url), {caption});
    } else {
        await ctx.reply(caption);
    }
};
const dagHelpText = createHelpText(dagCommand, 'Invoca una divinità animata');
module.exports.commands.push(createCommand(dagCommand, dagHandler, dagHelpText, false));

const sdaCommand = 'sda';
const sdaHandler = async ctx => {
    const { data : { blasphemy } = {}} = await axios.get(blasphemyGeneratorUrl);
    if(blasphemy) {
        await ctx.reply(blasphemy);
    }
};
const sdaHelpText = createHelpText(sdaCommand, 'Invoca una divinità articolata');
module.exports.commands.push(createCommand(sdaCommand, sdaHandler, sdaHelpText, false));
