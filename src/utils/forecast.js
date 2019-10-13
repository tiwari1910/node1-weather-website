const request = require('request')
const chalk = require('chalk')
const moment = require('moment')
const forecast = (lat, long, location, callback) => {
    const url = 'https://api.darksky.net/forecast/67cc165cb0a5192232027abf3f3b4c31/'+lat+','+long+'?units=si'

    request({
        url,
        json: true  
    }, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather services.')
        }else if(body.error){
            callback('Unable to fetch weather data from the provided location')
        }else{
            weather = body.currently
            date = new Date(weather.time)
            details = "Current Time: "+ moment.unix(date).format('L') + "."
            details += " It is currently "+weather.temperature+" degree celcius out in "+location+". There is "+weather.precipProbability+"% chance of rain."
            callback(undefined, details)
        }
    })
}

module.exports = {
    forecast
}