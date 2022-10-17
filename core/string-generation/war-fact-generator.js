const StringGenerator = require('./string-generator');

const warFactGenerator = new StringGenerator();

warFactGenerator.addSet('N', require('../data/war-facts/nations'));
warFactGenerator.addSet('A', require('../data/war-facts/actions'));
warFactGenerator.addSet('R', require('../data/war-facts/reasons'));

warFactGenerator.addFormat('{{N}} {{A}} {{N}} {{?semplicemente}} perché {{R}}');

module.exports = warFactGenerator;