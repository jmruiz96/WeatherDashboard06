var apiKey = "7a480e36f75524b0ccdac9a4e3614bcf";
//            7a480e36f75524b0ccdac9a4e3614bcf
var cityInput = $("#city-input");
var submitBtn = $("#submit");

var cityName = "";

// Current Weather
function getCurrentWeather (){
    urlApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=7a480e36f75524b0ccdac9a4e3614bcf&units=imperial&APPID";
    // var urlApi = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=7a480e36f75524b0ccdac9a4e3614bcf&units=imperial&APPID"
    fetch(urlApi)
    .then(res => res.json())
    .then(data => { 
        console.log(data)
        displayCurrentWeather(data)
        displayForecast(data, 0)
        displayForecast(data, 1)
        displayForecast(data, 2)
        displayForecast(data, 3)
        displayForecast(data, 4)
    })
}


//Current weather conditions for that city// 
function displayCurrentWeather (data) {
    var cityNameH2 = $("#city-name");
    cityNameH2.text(`${data.name}`)

    var dayH2 = $("#today-date");
    dayH2.text(dayjs().format("MMMM DD, YYYY"));

    var tempH4 = $("#temperature");
    tempH4.text((`Temp: ${data.main.temp}\u00B0F`));

    var humidityH4 = $("#humidity");
    humidityH4.text(`Humidity: ${data.main.humidity}%`)

    var windSpeedH4 = $("#wind-speed");
    windSpeedH4.text((`Wind: ${data.wind.speed} MPH`))

    var icon = $("#icon")
    icon.src = 'http://openweathermap.org/img/w/${data.weather[0].icon}.@2x.png'
}

//5-day forcast
function displayForecast (data,index) {
    // for (var i = 0; i < (data.list.length); i++) {
    //     if (i===4 || i===12 || i===20 || i===28 || i===36) {
    var dayH2 = $("#date" + (index + 1));
    dayH2.text(dayjs().add(index + 1, "day").format("MMMM DD, YYYY"));

    var tempH4 = $("#temp" + (index + 1));
    tempH4.text(`Temp: ${data.main.temp}\u00B0F`);

    var humidityH4 = $("#hum" + (index + 1));
    humidityH4.text(`Wind: ${data.wind.speed} MPH`);

    var windSpeedH4 = $("#wind" + (index + 1));
    windSpeedH4.text(`Humidity: ${data.main.humidity}%`);

    var icon = $("#icon" + (index + 1))
    icon.src = "http://openweathermap.org/img/wn/"+ data.daily[index].weather[0].icon +"@2x.png"
}
// }
// }
// Search Cities
function searchCity (event) {
    event.preventDefault();
    cityName = cityInput.val();
    getCurrentWeather();
}

submitBtn.on("click", searchCity)
