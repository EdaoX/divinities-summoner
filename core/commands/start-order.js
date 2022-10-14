const { createCommand } = require('./index');
const { createHelpText } = require('./help');
const { shuffleArray } = require('../utilities');

const colleagueNames = [
    'Gabriele',
    'Luca',
    'Luigi',
    'Marco',
    'Matteo'
];

const formatName = (name, index) => `${index + 1}) - ${name}`

const getShuffledNames = (names, honest = false) => {
    const shuffled = shuffleArray(names);
    if(honest) {
        return shuffled;
    }

    return ['Luigi', ...(shuffled.filter(name => name !== 'Luigi'))];
};

const formatNamesForReply = names => names.map(formatName).join("\n");

module.exports.commands = [];

const command = 'order';
const handler = ctx => {
    const shuffled = getShuffledNames(colleagueNames);
    ctx.reply(formatNamesForReply(shuffled));
};
const helpText = createHelpText(command, 'Un ordine totalmente casuale di nomi')
module.exports.commands.push(createCommand(command, handler, helpText));

const honestCommand = 'ordertrue';
const honestHandler = ctx => {
    const shuffled = getShuffledNames(colleagueNames, true);
    ctx.reply(formatNamesForReply(shuffled));
};
const honestHelpText = createHelpText(honestCommand, 'Un ordine onestamente casuale di nomi')
module.exports.commands.push(createCommand(honestCommand, honestHandler, honestHelpText));