// Require files
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Setting up custom constants
const app = express()
const port = 3000

//Define paths for express configuration
publicDirectoryPage = path.join(__dirname, '../public')
viewPath = path.join(__dirname, '../templates/views') //This path is only required when views directory has name other than views
partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath) //This is used to set the view location. It is only required if views folder has different name
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPage))

// Requests list
app.get('/', (request, response) => {
    response.render('index', {
        title: 'Weather',
        createdBy: 'Satya Prakash'
    })
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        createdBy: 'Satya Prakash'
    })
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        createdBy: 'Satya Prakash'
    })
});

app.get('/weather', (request, response) => {
    if(!request.query.address){
        return response.send({
            error: 'Please provide address to forecast weather'
        })
    }
    geocode.coordinates(request.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return response.send({
                error
            })
        }
        forecast.forecast(latitude, longitude, location, (error, data) => {
            if(error){
                return response.send({
                    error
                })
            }
            response.send({
                forecast: data,
                address: request.query.address,
                location
            })
        })
    })
    
});

app.get('/help/*', (request, response) => {
    response.render('error/404', {
        code: '404',
        title: '404 Not Found',
        errorMessage: 'Sorry! Article related to help not found.',
        createdBy: 'Satya Prakash'
    });
});

app.get('*', (request, response) => {
    response.render('error/404', {
        code: '404',
        title: '404 Not Found',
        errorMessage: 'Sorry! Page not found.',
        createdBy: 'Satya Prakash'
    });
});
// Setting up server to listen to user request on specific port
app.listen(port, () => console.log("Server is running on port number 3000."))