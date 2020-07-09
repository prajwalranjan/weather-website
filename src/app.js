const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { response } = require('express');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));  //This serves all the files in that path

// .get() will tell what app should do when someone tries to get a resource

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Prajwal Ranjan'
    })  //second argument is an object which consists of the variables that can be accessed by the views page
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Prajwal Ranjan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hope this helps',
        title: 'Help Page',
        name: 'Prajwal Ranjan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'Error',
        name: 'Prajwal Ranjan',
        errorMessage: 'Help article not found...'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'Please provide an address...'
        })
    }
 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                location: location,
                forecast: forecastData, 
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: ''
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Prajwal Ranjan',
        title: 'Error',
        errorMessage: 'Error 404! Page not found...'
    })
})

//Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000...');
});