const request = require('request');
const chalk = require('chalk');

const geocode = (address,callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhandhbHJhbmphbjk5IiwiYSI6ImNrY2JsbTZ4NTI2OXgyeW1nMG1kOWxpc3UifQ.3YUeXQtS7ZRuCU2w-agGNQ';
    request({url, json: true}, (error,response) => {
        if (error) {
            callback(chalk.red("Unable to connect to Geocoding Service..."), undefined);
        } else if(response.body.features.length === 0) {
            callback(chalk.red("Unable to find location..."), undefined);
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;

// //Geocoding
// //Address -> lat/long -> weather

// const geocodeUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicHJhandhbHJhbmphbjk5IiwiYSI6ImNrY2JsbTZ4NTI2OXgyeW1nMG1kOWxpc3UifQ.3YUeXQtS7ZRuCU2w-agGNQ';

// request({url: geocodeUrl, json: true}, (error,response) => {
//     if (error) {
//         console.log(chalk.red("Unable to connect to Geocoding Service..."));
//     } else if(response.body.features.length === 0) {
//         console.log(chalk.red("Unable to find location..."));
//     } else{
//         const lat = response.body.features[0].center[1];
//         const long = response.body.features[0].center[0]
//         console.log("Latitude: "+lat);
//         console.log("Longitude: "+long);
//     }
// })