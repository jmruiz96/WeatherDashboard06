var apiKey = "7a480e36f75524b0ccdac9a4e3614bcf";
//            7a480e36f75524b0ccdac9a4e3614bcf
var cityInput = $("#city-input");
var submitBtn = $("#submit");
var storedCity = JSON.parse(localStorage.getItem("city")) || [];
var cityName = "";
var cityTable = $(".table")
var clearBtn = $("#clearBtn")
var remove = $(".remove")

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
    var cityCw = $("#city-name");
    cityCw.text(`${data.name}`)

    var dayCw = $("#today-date");
    dayCw.text(dayjs().format("MMMM DD, YYYY"));

    var tempCw = $("#temperature");
    tempCw.text((`Temp: ${data.main.temp}\u00B0F`));

    var humidityCw = $("#humidity");
    humidityCw.text(`Humidity: ${data.main.humidity}%`)

    var windSpeedCw = $("#wind-speed");
    windSpeedCw.text((`Wind: ${data.wind.speed} MPH`))

    var icon = $("#icon")
    icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.@2x.png`
    // come back if time
}

//5-day forcast
function displayForecast (data1,index) {
    
    var dayDf = $("#date" + (index + 1));
    dayDf.text(dayjs().add(index + 1, "day").format("MMMM DD, YYYY"));

    var tempDf = $("#temp" + (index + 1));
    tempDf.text(`Temp: ${data1.list[index].main.temp}\u00B0F`);

    var humidityDf = $("#hum" + (index + 1));
    humidityDf.text(`Wind: ${data1.list[index].wind.speed} MPH`);

    var windSpeedDf = $("#wind" + (index + 1));
    windSpeedDf.text(`Humidity: ${data1.list[index].main.humidity}%`);

    var icon = $("#icon" + (index + 1))
    icon.src = `http://openweathermap.org/img/wn/+${data1.list[index].weather[0].icon}+@2x.png`
    //just straight up not working will come back
};
// Search Cities
function searchCity (event) {
    event.preventDefault();
    cityName = cityInput.val();
    getCurrentWeather();
     if (storedCity.includes(cityInput) || cityInput === "") {
         return;
     }
     var cityList = $("#cityList")
     var searchedCity = $("<li>")
     searchedCity.text(cityName);
     searchedCity.val(cityName);
     cityList.append(searchedCity);
     cityTable.append(cityList);
     storedCity.push(cityName);
     localStorage.setItem("city", JSON.stringify(storedCity));
};

function init(storedCity) {
    if (storedCity !== null) {
        for(var i = 0; i < storedCity.length; i++) {
            var cityList = $("#cityList")
            var gotCity =$('<li>')
            gotCity.text([storedCity[i]]);
            gotCity.val(storedCity[i]);
            cityList.append(gotCity);
            cityTable.append(cityList);
        }
    }
};

init(storedCity);
//localStorage did not make the final cut I could get it to save locally but only object, object would pop up in the table

submitBtn.on("click", searchCity)
remove.on("click", "#clearBtn", function (e) {
    e.preventDefault();
    localStorage.removeItem("city", JSON.stringify(storedCity));
    location.reload();
  })
