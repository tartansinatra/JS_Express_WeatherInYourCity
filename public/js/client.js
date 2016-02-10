var Weather = function(city){
  this.url = 'http://localhost:1337/weather/' +city
  this.data;
}

Weather.prototype = {

  get: function(callback){
    var that = this;

    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function(){
      that.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}


window.onload = function(){

  var form = document.querySelector('#citySearch');
  var input = document.querySelector('#cityInput');
  var weatherView = document.querySelector('#cityDisplay');

  form.onsubmit = function(event){
    event.preventDefault();
    var currentCity = input.value;
    var currentWeather = new Weather(city);

    currentWeather.get(function(){
      var data = currentWeather.data;
      var cityDisplay = "<h4>" + data.name + "</h4>" + "<h3>" + data.weather["main"]"</h3>";
      weatherView.innerHTML = cityDisplay;
    });

  }



