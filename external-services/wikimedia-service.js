const axios = require('axios');

const { debug } = require('../core/utilities');

const wikimediaBaseUrl = 'https://it.wikipedia.org/w/api.php';

const makePictureRequestFromQuery = query => ({
    origin: '*',
    titles: query,
    action: 'query',
    prop: 'pageimages',
    redirects: 1,
    pithumbsize: 400,
    format: 'json',

});

const getAnimalPictureUrl = async animal => {
    const params = makePictureRequestFromQuery(animal);
    const response = await axios.get(wikimediaBaseUrl, { params });
    return Object.values(response.data.query.pages)[0].thumbnail?.source;
}

module.exports.getAnimalPictureUrl = getAnimalPictureUrl;