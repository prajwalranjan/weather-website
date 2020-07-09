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
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " out. The humidity is " + response.body.current.humidity + "%.");
        } 
    })
}

module.exports = forecast;
