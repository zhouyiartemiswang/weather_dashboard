$(document).ready(function () {
    var apiKey = "1a34d5427de21a8b7c1ff08c09a6eb91";
    var cityName = "seattle";
    var currentIconID = "";
    var cityLatitude = 0;
    var cityLongitude = 0;
    var currentTemp = 0;
    var currentHumidity = 0;
    var currentWindSpeed = 0;
    var currentUVI = 0;

    var futureIconId = [];
    var futureTemp = [];
    var futureHumidity = [];

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

    var futureWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey;

    $.ajax({
        url: futureWeatherURL,
        method: "GET"
    }).then(function (futureWeatherResponse) {
        console.log(futureWeatherResponse);
        currentIconID = futureWeatherResponse.current.weather[0].icon;
        currentTemp = futureWeatherResponse.current.temp.toFixed(1) + " \xB0F";
        currentHumidity = futureWeatherResponse.current.humidity + "%";
        currentWindSpeed = futureWeatherResponse.current.wind_speed.toFixed(1) + " MPH";
        currentUVI = futureWeatherResponse.current.uvi;

        for (var i = 1; i <= 5; i++) {
            futureIconId[i - 1] = futureWeatherResponse.daily[i].weather[0].icon;
            futureTemp[i - 1] = futureWeatherResponse.daily[i].temp.day + " \xB0F";
            futureHumidity[i - 1] = futureWeatherResponse.daily[i].humidity + "%";

        }
        displayCurrentWeather();
        displayFutureWeather();
    });

    // var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=" + apiKey;

    // $.ajax({
    //     url: uviURL,
    //     method: "GET"
    // }).then(function (uvi) {
    //     console.log(uvi);
    //     currentUVI = uvi.value;
    //     displayCurrentWeather();
    // });

    function displayCurrentWeather() {
        $("#header").text(cityName + " (" + moment().format("l") + ")");
        $("#weatherIcon").attr("src", " http://openweathermap.org/img/wn/" + currentIconID + ".png");
        $("#temp").text("Temperature: " + currentTemp);
        $("#humidity").text("Humidity: " + currentHumidity);
        $("#wind-speed").text("Wind Speed: " + currentWindSpeed);
        $("#uvi").text(currentUVI);
        if (currentUVI < 2) {
            $("#uvi").css("background-color", "#8DCF94"); // green
        } else if (currentUVI >= 2 && currentUVI < 5) {
            $("#uvi").css("background-color", "#FFDF00"); // yellow
        } else if (currentUVI >= 5 && currentUVI < 7) {
            $("#uvi").css("background-color", "#FAA400"); // orange
        } else if (currentUVI >= 7 && currentUVI < 10) {
            $("#uvi").css("background-color", "#FAA400"); // red
        } else {
            $("#uvi").css("background-color", "#DE388F"); // magenta
        }

    }

    function displayFutureWeather() {
        for (var i = 1; i <= 5; i++) {
            var futureDate = moment().add(i, "d").format("l");
            $("#futureDay" + i).text(futureDate);
            $("#icon" + i).attr("src", " http://openweathermap.org/img/wn/" + futureIconId[i - 1] + ".png");
            $("#temp" + i).text("Temp: " + futureTemp[i - 1]);
            $("#humidity" + i).text("Humidity: " + futureHumidity[i - 1]);
        }

    }
});
