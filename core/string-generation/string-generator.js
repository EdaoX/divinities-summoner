const {pickRandomFromArray, randomTrue, capitalize, removeDoubleSpaces} = require('../utilities');

const TOKEN_REGEX = /({{\??[\w|\sàèéìòù',]+}})/g;

module.exports = class StringGenerator
{
    maxIterations = 20;

    constructor()
    {
        this.formats = [];
        this.sets = {}
    }

    static wrapSymbol(symbol)
    {
        return `{{${symbol}}}`;
    }

    addFormat(format)
    {
        this.formats.push(format);
    }

    addFormats(formats)
    {
        formats.forEach((format) => this.addFormat(format));
    }

    addSet(symbol, set)
    {
        this.sets[symbol] = set;
    }

    getSet(symbol)
    {
        return this.sets[symbol] || [];
    }

    setMaxIterations(iterations)
    {
        this.maxIterations = iterations;
    }

    getMaxIterations()
    {
        return this.maxIterations;
    }

    generate()
    {
        let generated = this.pickRandomFormat();
        let iteration = 0;

        while(this.hasReplaceableTokens(generated) && iteration < this.getMaxIterations()) {
            iteration += 1;
            generated = this.replaceTokens(generated);
        }

        return capitalize(removeDoubleSpaces(generated.trim()));
    }

    replaceTokens(format)
    {
        return format.replace(TOKEN_REGEX, (match, token) => this.replaceToken(token));
    }

    pickRandomFormat()
    {
        return pickRandomFromArray(this.formats);
    }

    replaceToken(token)
    {
        token = token.replace(/{{|}}/g, '');

        if(token.includes('?')) {
            if(!randomTrue()) {
                return '';
            }
            token = token.replace('?', '');
        }

        if(token.includes('|')) {
            token = pickRandomFromArray(token.split('|'));
        }

        const set = this.getSet(token);
        if(!set.length)
            return token;
        
        return pickRandomFromArray(set);
    }

    hasReplaceableTokens(checkedString)
    {
        return !!checkedString.match(TOKEN_REGEX);
    }
}