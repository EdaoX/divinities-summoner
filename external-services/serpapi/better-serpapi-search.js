const https = require('https');
const SerpApi = require('google-search-results-nodejs');

module.exports = class BetterSerpApiSearch extends SerpApi.GoogleSearch{
    json(parameter, callback, errorCallback = () => {}) {
        this.search(parameter, "json", (data) => {
            let parsed = JSON.parse(data)
            callback(parsed)
        }, error => errorCallback(error));
    }

    /***
     * Run raw search query 
     * 
     * @param [Map] parameter (see: serpapi.com)
     * @param [Function] callback
     */
    search(parameter, output, callback, errorCallback = () => {}) {
        this.execute("/search", parameter, callback, output, errorCallback)
    }

    /***
     * execute
     * 
     * @param path URL path
     * @param parameter query
     * @param callback handle next step
     * @param output format json|html
     */
    execute(path, parameter, callback, output, errorCallback = () => {}) {
        let url = this.buildUrl(path, parameter, output);
        https.timeout = this.defaultTimeout
        https.get(url, (resp) => {
            let data = ''

            resp.on('data', (chunk) => {
                data += chunk
            })

            resp.on('end', () => {
                try {
                    if (resp.statusCode == 200) {
                        callback(data)
                    } else {
                        errorCallback(data, resp.statusCode);
                    }
                } catch (e) {
                    errorCallback(data, 0);
                }
            });

        }).on("error", (err) => {
            console.log('asd');
            errorCallback(err, 0);
        });
    }
};