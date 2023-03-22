const StringGenerator = require('./string-generator');

const dpcmGenerator = new StringGenerator();

dpcmGenerator.addSet('S', require('../data/dpcm/statements'));
dpcmGenerator.addSet('C', require('../data/dpcm/conditions'));
dpcmGenerator.addSet('O', require('../data/dpcm/orders'));
dpcmGenerator.addSet('A', require('../data/dpcm/activities'));
dpcmGenerator.addSet('P', require('../data/dpcm/places'));
dpcmGenerator.addSet('E', require('../data/dpcm/exceptions'));
dpcmGenerator.addSet('W', require('../data/dpcm/whens'));

dpcmGenerator.addFormat('{{S}} {{C}}, {{O}} {{A}} {{?P}} {{E}} {{W}}');

module.exports = dpcmGenerator;