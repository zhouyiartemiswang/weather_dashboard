# Weather Dashboard

## Requirements

Build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS. Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. Use `localStorage` to store any persistent data.

* Weather dashboard must have form inputs

* When user searches for a city, the current and future conditions for that city are displayed and that city is added to the search history

* Current weather conditions consist of city name, current date, an icon representation of weather conditions, current temperature, current humidity, current wind speed, and UV index

    * UV Index Color Coding

        * Low: UVI < 2  <span style="background-color:#8DCF94">UVI</span>

        * Moderate: 2 <= UVI < 5  <span style="background-color:#FFDF00">UVI</span>

        * High: 5 <= UVI < 7  <span style="background-color:#FAA400">UVI</span>

        * Very High: 7 <= UVI <10  <span style="background-color:#F21017">UVI</span>

        * Extreme: UVI >= 10  <span style="background-color:#DE388F">UVI</span>

* Future weather conditions consist of 5-day forecast that displays date, an icon representation of weather conditions, temperature, and humidity

* When user clicks on a city in the search history, current and future conditions for that city will be displayed

* When opening the weather dashboard, the last searched city current weather and forecast


## Website Walk-Through

* On loading

  <img src="Assets/after_loading.png">

* Display weather

  <img src="Assets/display_weather.png">


## Files

* `index.html`

* `script.js`

* `style.css`

* `after_loading.png`

* `display_weather.png`

* `README.md`


## Deployed Link
https://zhouyiartemiswang.github.io/weather_dashboard/
