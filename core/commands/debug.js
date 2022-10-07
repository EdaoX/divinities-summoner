const { createCommand } = require('./index');
const { DEBUG } = require('../config');
const { createHelpText } = require('./help');
const { getAnimalPictureUrl } = require('../../external-services/wikimedia-service');
const { Input } = require('telegraf');

if( DEBUG ) {
    const command = 'debug';
    const handler = async ctx => {
        
    };
    const helpText = createHelpText(command, "Debug dell'applicazione");
    module.exports.commands = [ createCommand(command, handler, helpText) ];
}