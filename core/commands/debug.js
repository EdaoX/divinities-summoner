const { createCommand } = require('./index');
const { DEBUG } = require('../config');
const { createHelpText } = require('./help');

if( DEBUG ) {
    const command = 'debug';
    const handler = async ctx => {
        
    };
    const helpText = createHelpText(command, "Debug dell'applicazione");
    module.exports.commands = [ createCommand(command, handler, helpText) ];
}