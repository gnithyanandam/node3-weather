const path = require('path')

const express = require('express')

const hbs= require('hbs')

const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

app.set('view engine', 'hbs')

//define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialssPath = path.join(__dirname,'../templates/partials')

app.set('views',viewsPath)
hbs.registerPartials(partialssPath)


app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Nithya'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me ',
        name: 'Nithya'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page ',
        name:'Nithya',
        message: 'this is a help messsage'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide address to fetch weather'
        })
    }
    geoCode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if (error) {
            res.send({
                address:req.query.address,
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    address:req.query.address,
                    error
                })
            }
            //console.log(location)
            //console.log(forecastData)
            res.send({
                location,
                forecast: forecastData,
                address:req.query.address
            })
        })


    })
    
})
// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error:'you must provide the search term'
//         })
//     }
//     console.log(req.query.search) 
//     res.send({
//         products: []
//     })
// })
app.get('/help/*',(req,res) => {
    res.render('error',{
        title:'Help Error',
        name:'Nithya',
        message:'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('error',{
        title:'404 Error',
        name:'Nithya',
        message:'Generic 404 message'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})