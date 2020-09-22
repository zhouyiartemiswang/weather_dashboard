$("#currentDate").text(moment().format("l"));
console.log(moment().format("l"));

var apiKey = "1a34d5427de21a8b7c1ff08c09a6eb91";
var cityName = "seattle";
var currentIconID = 0;
var cityLatitude = 0;
var cityLongitude = 0;
var currentTemp = 0;
var currentHumidity = 0;
var currentWindSpeed = 0;
var currentUVI = 0;

var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
$.ajax({
    url: currentWeatherURL,
    method: "GET"
}).then(function (currentWeatherResponse) {
    // console.log(response);
    cityName = currentWeatherResponse.name;
    cityLatitude = currentWeatherResponse.coord.lat;
    cityLongitude = currentWeatherResponse.coord.lon;
    
});

var futureWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&exclude=minutely,hourly&appid=" + apiKey;

$.ajax({
    url: futureWeatherURL,
    method: "GET"
}).then(function(futureWeatherResponse) {
    console.log(futureWeatherResponse);
    currentIconID = futureWeatherResponse.current.weather.icon;
    currentTemp = futureWeatherResponse.current.temp + "\xB0F";
    currentHumidity = futureWeatherResponse.current.humidity + "%";
    currentWindSpeed = futureWeatherResponse.current.wind_speed + " MPH";
    currentUVI = futureWeatherResponse.current.uvi;

});