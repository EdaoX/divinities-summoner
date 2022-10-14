const { DEBUG } = require('./config');

module.exports.escapeForMarkdown = text => {
    return text.replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\`/g, '\\`')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!');
}

module.exports.pickRandomFromArray = arr => arr[Math.floor(Math.random() * arr.length)];

module.exports.debug = {};
module.exports.debug.log = (...params) => {
    if(DEBUG) {
        console.log(params);
    }
}

module.exports.debug.warn = (...params) => {
    if(DEBUG) {
        console.warn(params);
    }
}

module.exports.censor = text => '*' + text.substring(1);

module.exports.getNextFridayDate = (date = new Date()) => {
    const dateCopy = new Date(date.getTime());
  
    const nextFriday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7),
      ),
    );

    nextFriday.setHours(19, 0, 0);
  
    return nextFriday;
}

module.exports.getNext19Date = (date = new Date()) => {
    const next19 = new Date(date.getTime());

    if(next19.getHours() >= 19) {
        next19.setTime(next19.getTime() + 24 * 60 * 60 * 1000);
    }

    next19.setHours(19, 0, 0);
    return next19;
}

module.exports.splitSecondsToTimeParts = totalSeconds => {
    const hours = Math.floor(totalSeconds / 60 / 60);
    const minutes = Math.floor((totalSeconds / 60) - hours * 60 );
    const seconds = Math.floor(totalSeconds % 60);

    return { hours, minutes, seconds };
};

module.exports.shuffleArray = arr => {
    return arr.map(e => ({ value : e, sort : Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value);
}