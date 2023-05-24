const axios = require('axios');
const { createCommand } = require('./index');
const { createHelpText } = require('./help');
const { escapeForMarkdown } = require('../utilities');
const { RANDOM_QUOTER_URL } = require('../config');
const randomQuoterUrl = `${RANDOM_QUOTER_URL}/api/quote/random`;

module.exports.commands = [];

const command = 'rq';
const handler = async ctx => {
    const { data : { quote : { body, author } = { } } = {} } = await axios.get(randomQuoterUrl);
    if(body && author) {
        await ctx.replyWithMarkdownV2(`${escapeForMarkdown(body)}\n\n_\\- ${escapeForMarkdown(author)}_`);
    }
};
const helpText = createHelpText(command, 'Visualizza una fantastica citazione');
module.exports.commands.push(createCommand(command, handler, helpText));