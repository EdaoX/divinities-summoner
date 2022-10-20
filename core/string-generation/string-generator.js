const {pickRandomFromArray, randomTrue, capitalize, removeDoubleSpaces} = require('../utilities');

const TOKEN_REGEX = /({{\??.+}})/g;

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

        while(StringGenerator.hasReplaceableTokens(generated) && iteration < this.getMaxIterations()) {
            iteration += 1;
            generated = this.replaceTokens(generated);
        }

        return capitalize(removeDoubleSpaces(generated.trim()));
    }

    pickRandomFormat()
    {
        return pickRandomFromArray(this.formats);
    }

    replaceToken(token)
    {
        token = token.trim();
        token = token.substring(2, token.length - 2);

        if(token.charAt(0) == '?') {
            if(!randomTrue()) {
                return '';
            }
            token = token.substring(1);
        }

        const pipeIndexes = StringGenerator.getTopLevelPipeIndexes(token);
        if(pipeIndexes.length) {
            const parts = StringGenerator.splitAtIndexes(token, pipeIndexes);
            token = pickRandomFromArray(parts);
        }

        const set = this.getSet(token);
        if(!set.length)
            return token;
        
        return pickRandomFromArray(set);
    }

    replaceTokens(format, iteraction = 0)
    {
        if(iteraction > this.maxIterations) {
            return format;
        }
    
        const tokens = StringGenerator.getTokens(format);
        tokens.reverse();

        for(const token of tokens) {
            const before = format.slice(0, token.start);
            const after = format.slice(token.end);
            const replaced = this.replaceToken(token.token);
            format = `${before}${replaced}${after}`;
        }
    
        if(!StringGenerator.hasReplaceableTokens(format)) {
            return format;
        }

        return this.replaceTokens(format, iteraction + 1);
    }

    static hasReplaceableTokens(checkedString)
    {
        return !!checkedString.match(TOKEN_REGEX);
    }

    static getTokens(checkedString)
    {
        let depths = [];
        let depth = -1;
    
        let i = 0;
    
        while(i < checkedString.length) {
    
            if(checkedString.charAt(i) == '{' && checkedString.charAt(i + 1) == '{') {
                
                depth += 1;
                const token = {
                    start : i,
                    end : null,
                    token : null
                }
    
                if(!depths[depth]) {
                    depths[depth] = [];
                }
    
                depths[depth].push(token);
                
                i += 1;
    
            } else if(checkedString.charAt(i) == '}' && checkedString.charAt(i + 1) == '}') {
                
                if(depths[depth]) {
    
                    if(depth < 0) {
                        depth = 0;
                    }
        
                    const token = depths[depth][depths[depth].length - 1];
                    token.end = i + 2;
                    token.token = checkedString.substring(token.start, token.end)
                    
                    depths[depth][depths[depth].length - 1] = token;
        
                    depth -= 1;
                    
                }

                i += 1;
                
            }
    
            i += 1;
        }
    
        return depths.filter(tokens => !!tokens).find(tokens => tokens.filter(token => !!token.token).length > 0) || [];
    }

    static splitAtIndexes(text, indexes = [])
    {
        if(!indexes?.length) {
            return;
        }
    
        if(indexes.length === 1) {
            return [
                text.substring(0, indexes[0]),
                text.substring(indexes[0] + 1, text.length)
            ]
        }
    
        indexes.sort((a, b) => a - b);
    
        const parts = [];
        
        indexes.forEach((index, i) => {
            if(i === 0) {
                parts.push(text.substring(0, index));
                return;
            }
    
            parts.push(text.substring(indexes[i - 1] + 1, index));
    
            if(i === indexes.length - 1) {
                parts.push(text.substring(index + 1, text.length));
                return;
            }
        });
    
        return parts;
    }

    static getTopLevelPipeIndexes(text)
    {
        const indexes = [];
        let depth = 0;
        let i = 0;
        while(i < text.length) {
            const char = text.charAt(i);
            const nextChar = text.charAt(i);
            if(depth === 0 && char === '|') {
                indexes.push(i);
            } else if (char === '{' && nextChar === '{') {
                depth += 1;
                i += 1;
            } else if (char === '}' && nextChar === '}') {
                depth -= 1;
                i += 1;
            }
    
            i += 1;
        }
        return indexes;
    }
}