const StringGenerator = require('./string-generator');

const projectGenerator = new StringGenerator();

projectGenerator.addSet('APP', require('../data/project-generator/applications'));
projectGenerator.addSet('C', require('../data/project-generator/clients'));
projectGenerator.addSet('T', require('../data/project-generator/triggers'));
projectGenerator.addSet('A', require('../data/project-generator/actions'));
projectGenerator.addSet('D', require('../data/project-generator/destinations'));
projectGenerator.addSet('P', require('../data/project-generator/precisations'));

projectGenerator.addFormat("C'è da creare {{APP}} per {{C}} che se {{T}} {{A}}. {{?P}}");
projectGenerator.addFormat("C'è da fare in modo che se {{T}} il sistema {{A}}. {{?P}}");
projectGenerator.addFormat("{{C}} {{ci ha chiesto|vuole}} {{APP}} con le seguenti feature:\n - {{quando|se}} {{T}} {{A}}\n - {{quando|se}} {{T}} {{A}}\n - {{quando|se}} {{T}} {{A}}");

module.exports = projectGenerator;