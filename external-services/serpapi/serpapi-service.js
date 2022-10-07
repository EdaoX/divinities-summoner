const BetterSerpApiSearch = require('./better-serpapi-search');

const { SERPAPI_KEY } = require('../../core/config');

const search = new BetterSerpApiSearch(SERPAPI_KEY);

const promisedRequest = params => {
    return new Promise((resolve, reject) => {
        search.json(params, resolve, reject);
    });
};

const createRequestParamsFromAnimal = animal => ({
    engine: "google",
    ijn: "0",
    q: animal,
    google_domain: "google.com",
    tbm: "isch",
    safe: "active",
    gl: "it"
});

const getAnimalPictureUrl = async animal => {
    
    const params = createRequestParamsFromAnimal(animal);
    try {
        const data = await promisedRequest(params);
        return data.images_results[0].thumbnail;
    } catch(e) {
        console.error(e);
    }
    return null;
};

module.exports = { getAnimalPictureUrl };