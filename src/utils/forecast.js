const request = require('request');
const chalk = require('chalk');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fefbe5785a358404739b276040467396&query='+latitude+','+longitude;
    request({url, json: true}, (error,response) => {
        if (error){
            callback(chalk.red("Unable to connect to Weather Service...")),undefined;
        } else if(response.body.error) {
            callback(chalk.red("Unable to find location..."), undefined);
        } else{
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " out.");
        } 
    })
}

module.exports = forecast;

//weatherstack key=fefbe5785a358404739b276040467396
// const url = 'http://api.weatherstack.com/current?access_key=fefbe5785a358404739b276040467396&query=12.9716,77.5946';

// request({url: url, json: true}, (error, response)=> {
//     if (error){
//         console.log(chalk.red("Unable to connect to Weather Service..."));
//     } else if(response.body.error) {
//         console.log(chalk.red("Unable to find location..."));
//     } else{
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " out.");
//     }
// })