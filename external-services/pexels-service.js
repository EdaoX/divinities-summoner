const { createClient } = require('pexels');
const { PEXELS_API_KEY } = require('../core/config');

const pexelsClient = createClient(PEXELS_API_KEY);

const getAnimalPictureUrl = async animal => {
    const requestData = {
        query : animal, 
        per_page: 1,
        locale : 'it-IT'
    };
    
    const response = await pexelsClient.photos.search(requestData);
    const { photos : [ photo = {} ] = [] } = response;
    const { src : { medium : url } = {} } = photo;
    return url;
};
module.exports = { pexelsClient, getAnimalPictureUrl };