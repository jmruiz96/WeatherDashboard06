var apiKey = "7a480e36f75524b0ccdac9a4e3614bcf";
//            7a480e36f75524b0ccdac9a4e3614bcf
var cityInput = $("#city-input");
var submitBtn = $("#submit");
var storedCity = JSON.parse(localStorage.getItem("city")) || [];
var cityName = "";
var cityTable = $(".table")
if(storedCity.length > 10) {
    storedCity.shift();
};

// Current Weather
function getCurrentWeather (){
    urlApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=7a480e36f75524b0ccdac9a4e3614bcf&units=imperial&APPID";
    // var urlApi = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=7a480e36f75524b0ccdac9a4e3614bcf&units=imperial&APPID"
    fetch(urlApi)
    .then(res => res.json())
    .then(data => { 
        console.log(data)
        displayCurrentWeather(data)
    })

    urlApiFc = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=7a480e36f75524b0ccdac9a4e3614bcf&units=imperial&APPID";
    fetch(urlApiFc)
    .then(res => res.json())
    .then(data1 => { 
        console.log(data1)
        displayForecast(data1, 0)
        displayForecast(data1, 1)
        displayForecast(data1, 2)
        displayForecast(data1, 3)
        displayForecast(data1, 4)
})
};



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
    // come back if time
}

//5-day forcast
function displayForecast (data1,index) {
    
    var dayH2 = $("#date" + (index + 1));
    dayH2.text(dayjs().add(index + 1, "day").format("MMMM DD, YYYY"));

    var tempH4 = $("#temp" + (index + 1));
    tempH4.text(`Temp: ${data1.list[index].main.temp}\u00B0F`);

    var humidityH4 = $("#hum" + (index + 1));
    humidityH4.text(`Wind: ${data1.list[index].wind.speed} MPH`);

    var windSpeedH4 = $("#wind" + (index + 1));
    windSpeedH4.text(`Humidity: ${data1.list[index].main.humidity}%`);

    var icon = $("#icon" + (index + 1))
    icon.src = "http://openweathermap.org/img/wn/"+ data1.list[index].weather[0].icon +"@2x.png"
    //just straight up not working will come back
}
// }
// }
// Search Cities
function searchCity (event) {
    event.preventDefault();
    cityName = cityInput.val();
    getCurrentWeather();
    if (storedCity.includes(cityInput) || cityInput === "") {
        return;
    }
    var cityList = $("#cityList")
    cityList.text(cityInput);
    cityList.val(cityInput);
    cityTable.append(cityList);
    storedCity.push(cityInput);
    localStorage.setItem("city", JSON.stringify(storedCity));
}

function init(storedCity) {
    if (storedCity !== null) {
        for(var i = 0; i < storedCity.length; i++) {
            var cityList = $("#cityList")
            cityList.text([storedCity[i]]);
            cityList.val(storedCity[i]);
            cityTable.append(cityList);
        }
    }
};

init(storedCity);

submitBtn.on("click", searchCity)
