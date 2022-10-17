const StringGenerator = require('./string-generator');

const warFactGenerator = new StringGenerator();

warFactGenerator.addSet('N', require('../data/war-facts/nations'));
warFactGenerator.addSet('A', require('../data/war-facts/actions'));
warFactGenerator.addSet('R', require('../data/war-facts/reasons'));
warFactGenerator.addSet('E', require('../data/war-facts/events'));
warFactGenerator.addSet('F', require('../data/war-facts/single-facts'));
warFactGenerator.addSet('P', require('../data/war-facts/persons'));

warFactGenerator.addFormat('{{N}} {{A}} {{N}} {{?semplicemente}} {{R}}');

module.exports = warFactGenerator;