const StringGenerator = require('./string-generator');

const rubberduckGenerator = new StringGenerator();

rubberduckGenerator.addSet('S', require('../data/rubberduck/simple-suggestions'));
rubberduckGenerator.addSet('D', require('../data/rubberduck/developers'));

rubberduckGenerator.addFormat("{{S}}");
rubberduckGenerator.addFormat("{{S}} e poi {{S}}");

module.exports = rubberduckGenerator;