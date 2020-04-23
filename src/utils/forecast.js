const request = require('request')

const forecast= (lat,long,callback)=>{
 const url = 'http://api.weatherstack.com/current?access_key=e9548fe975948fb78d14c16e9691beba&query='+lat+','+long

 request({ url,json:true},(error,{body})=>{
     if(error){
         callback('Unable to connect to weather service')
     }
     else if(body.error){
        callback('Unable to find the location')
     }
     else{
        callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.')
     }
 })

}

module.exports=forecast;