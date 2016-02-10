var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');


// APPLICATION SETTINGS
app.set('views', './views');  // Means 'set my views to be in the view folder'.
app.set('view engine', 'ejs'); // Means set my view engine to be EJS.

// MIDDLEWARE SETTINGS
app.use(expressLayouts);
app.use(express.static('public'));


app.get('/weather', function(req, res){
  res.render('weather');
});

app.get('/weather/:city', function(request, response){

// DEFINING THE EXTERNAL DATA SOURCE (API)

  http.get('http://api.openweathermap.org/data/2.5/weather?q='+request.params.city +'&appid=482d547d03fb328e3ba129d5bf2b350f', function(res) {

    var body = '';
    res.on('data', function(d){
      body += d;
    });

    res.on('end', function(){
      var weather = JSON.parse(body)
      response.send(weather['city:' +request.params.name]);
    })
  });
});

app.listen('3000', function(){
  console.log('Serving on Port 3000')
});