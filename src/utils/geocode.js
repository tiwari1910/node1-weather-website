const request = require('request')

const coordinates = (address, callback) => {
    const geocodeKey = 'pk.eyJ1Ijoic2F0eWExIiwiYSI6ImNrMTVhOWcyNzBiNjAzbm55OGs1eHE5MWsifQ.eeycq0AnpKCjb7OlNkrz6A'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+geocodeKey+'&limit=1'
    console.log(url)
    request({
        url,
        json: true
    }, (error, {body} = {}) => {
        if(error){
            callback('There were issues in connecting to geocode services. Please try again later.')
        }else if(body.features.length === 0){
            console.log('bye')            
            callback('Unable to fetch coordinates from location provided.')
        }else{
            console.log('hie')
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    coordinates
}