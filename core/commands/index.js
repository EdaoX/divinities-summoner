module.exports.createCommand = (command, handler, helpText, sfw = true) => ({command, handler, helpText, sfw});

const fs = require('fs');
const path = require('path');
const { createHelpCommand } = require('./help');

const currentDirectory = path.resolve(__dirname);

const commands = fs.readdirSync(currentDirectory).reduce((commands, file) => {
    if(!file.endsWith('.js') || file === 'index.js') {
        return commands;
    }

    const exposedCommands = require(`${currentDirectory}/${file}`).commands || [];

    return [...commands, ...exposedCommands];
}, []);

commands.push(createHelpCommand(commands));

module.exports.commands = commands;