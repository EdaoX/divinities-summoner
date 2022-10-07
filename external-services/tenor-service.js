const axios = require('axios');
const { TENOR_API_CLIENT_KEY, TENOR_API_KEY } = require('../core/config');

const tenorApiUrl = 'https://tenor.googleapis.com/v2/search';

const createRequestFromAnimal = animal => ({
    q : animal,
    client_key : TENOR_API_CLIENT_KEY,
    key : TENOR_API_KEY,
    limit : 1
});

const getAnimalGIFUrl = async animal => {
    const params = createRequestFromAnimal(animal);
    const response = await axios.get(tenorApiUrl, { params });

    return response.data.results[0].media_formats.gif.url;
};

module.exports = { getAnimalGIFUrl };