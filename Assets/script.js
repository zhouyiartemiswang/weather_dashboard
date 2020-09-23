// TODO: fixed UVI api error
$(document).ready(function () {

    var apiKey = "1a34d5427de21a8b7c1ff08c09a6eb91";
    var cityName = "";
    var cityList = [];
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

    displayStoredCities();

    function displayStoredCities() {
        cityList = JSON.parse(localStorage.getItem("cityList")) || [];
        // console.log(cityList);
        for (var i = 0; i < cityList.length; i++) {
            displayInput(cityList[i]);
        }
        
    }
    
    function displayInput(cityInput) {
        var newCity = $("<span>", {id: cityInput, class: "w3-bar-item w3-hover-grey"});
        newCity.text(cityInput);
        console.log(newCity);
        $("#display-city-list").append(newCity);
    }

    function getData(city) {

        // city = $("#cityInput").val().trim();
        // console.log(city);
        if (city) {
            $("main").css("display", "block");
            cityName = city.charAt(0).toUpperCase() + city.slice(1);
            if (cityList.indexOf(cityName) === -1) {
                // console.log(cityName);
                cityList.push(cityName);
                localStorage.setItem("cityList", JSON.stringify(cityList));
                // console.log(cityList);
            } 
            // else {
            //     console.log("In the list");
        
            // } 

            var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
            $.ajax({
                url: currentWeatherURL,
                method: "GET"
            }).then(function (currentWeatherResponse) {
                // console.log(currentWeatherResponse);

                cityName = currentWeatherResponse.name;
                cityLatitude = currentWeatherResponse.coord.lat;
                cityLongitude = currentWeatherResponse.coord.lon;

            });

            var futureWeatherURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey;

            $.ajax({
                url: futureWeatherURL,
                method: "GET"
            }).then(function (futureWeatherResponse) {
                // console.log(futureWeatherResponse);
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

            //     $.ajax({
            //         url: uviURL,
            //         method: "GET"
            //     }).then(function (uvi) {
            //         console.log(uvi.value);
            //         // currentUVI = uvi.value;
            //         var updatedUVI = uvi.value;
            //         displayCurrentWeather();
            //         // displayFutureWeather();
            //         return updatedUVI;
            //     });
            //     currentUVI = updatedUVI;
            
            // If the input city is already in the array, then don't append it to the list of city
            if (cityList.indexOf(cityName) > -1) {
                return;
            }

            displayInput(cityName);
            console.log("Here");

        } else {
            return;
        }
    }

    function displayCurrentWeather() {
        $("#header").text(cityName + " (" + moment().format("l") + ")");
        $("#weatherIcon").attr("src", " http://openweathermap.org/img/wn/" + currentIconID + ".png");
        $("#temp").text("Temperature: " + currentTemp);
        $("#humidity").text("Humidity: " + currentHumidity);
        $("#wind-speed").text("Wind Speed: " + currentWindSpeed);
        $("#uvi").text(currentUVI);
        if (currentUVI < 2) {
            $("#uvi").css("background-color", "#8DCF94"); // green 1-2
        } else if (currentUVI >= 2 && currentUVI < 5) {
            $("#uvi").css("background-color", "#FFDF00"); // yellow 3-5
        } else if (currentUVI >= 5 && currentUVI < 7) {
            $("#uvi").css("background-color", "#FAA400"); // orange 5-7
        } else if (currentUVI >= 7 && currentUVI < 10) {
            $("#uvi").css("background-color", "#FAA400"); // red 8-10
        } else {
            $("#uvi").css("background-color", "#DE388F"); // magenta 11+
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
    
    
    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        
        cityName = $("#cityInput").val().trim();
        // cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        getData(cityName);
    });

    $(".w3-bar-item").on("click", function(event) {
        event.preventDefault();
        cityName = event.target.id;
        // cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        // console.log(cityName);
        getData(cityName);
    });

    
});
