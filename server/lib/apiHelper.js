const config = require('../../config/index.js');
const axios = require('axios');
var Promise = require('bluebird');

module.exports.getUPC = (upc) => {
  return new Promise ((resolve, reject) => {
    axios({
      method: 'get',
      url: 'https://api.nutritionix.com/v1_1/item',
      params: {
        upc: upc,
        appId: config.NUTRITIONIX_API.ID,
        appKey: config.NUTRITIONIX_API.KEY
      }
    }).then((foodObj) => {
        axios({
          method: 'get',
          url: 'https://api.cognitive.microsoft.com/bing/v5.0/search',
          params: {
            q: foodObj.data.item_name,
            count: 1
          },
          headers: {
            'Ocp-Apim-Subscription-Key': config.BING_API_KEY
          }
      }).then((imageObj) => {
        const result = {
          name: foodObj.data.item_name,
          image: imageObj.data.images.value[0].contentUrl,
          notes: foodObj.data.brand_name,
        }
        resolve(result);
      }).catch((err) => {
        console.log('ERROR: ', err);
        reject(err);
      });
    }).catch((err) => {
      console.log('ERROR: ', err);
      reject(err);
    });
  })
}