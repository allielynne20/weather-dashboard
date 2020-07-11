var currentDay = document.getElementById("currentDay");
currentDay.innerHTML = moment().format('MM/DD/YYYY');

//this variable targets the id of hte input that contains the searched city
var cityInput = document.getElementById("cityname");
//this variable targets the id of the entire form
// var cityForm = document.querySelector("#city-form");
//this variable targets the id of the empty div under the form 
var historyList = document.querySelector("#city-history");

$("#button").on("click", function () {
    event.preventDefault();
    var cityname = $("#cityname").val();
    console.log(cityname);
    cityname.value = "";
    weatherSearch(cityname);
})

var weatherSearch = function (cityname) {
    var weatherCondition = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&appid=fe4831ea04035583e11d878e5799c1d9&units=imperial';
    $.ajax({
        type: "GET",
        url: weatherCondition,
        dataType: "json",
    })
        .then(function (response) {

            console.log(response);

            $("#today").empty();

            var card = $('<div>').addClass("card");
            var cardBody = $('<div>').addClass("card-body").attr("id", "uvi");
            var title = $("<h3>").addClass("card-header text-uppercase").text(response.name);
            var temp = $("<h4>").attr("id", "temp").text("Temperature: " + response.main.temp);
            var humid = $("<h4>").attr("id", "humid").text("Humidity: " + response.main.humidity + "%");
            var wind = $("<h4>").attr("id", "wind").text("Wind Speed: " + response.wind.speed + "mph");
            // var uv = $("<h4>").attr("id", "uv");
            var img = $("<img>").addClass("imagetoday").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            cardBody.append(img, temp, humid, wind);
            card.append(title, cardBody);
            $("#today").append(card);

            var lattitude = response.coord.lat;
            var longitude = response.coord.lon;

            fiveDay(lattitude, longitude);

        })
}

var fiveDay = function (lattitude, longitude) {

    // var weatherCondition = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&appid=fe4831ea04035583e11d878e5799c1d9&units=imperial';
    // $.ajax({
    //     type: "GET",
    //     url: weatherCondition,
    //     dataType: "json",
    // })

    var weatherCondition = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lattitude + '&lon=' + longitude + '&exclude=minutely,hourly&appid=fe4831ea04035583e11d878e5799c1d9&units=imperial';

    console.log(weatherCondition)

    $.ajax({
        type: "GET",
        url: weatherCondition,
        dataType: "json",
    })

        .then(function (response) {
            console.log(response);

            $("#forecast").empty();

            for (i = 0; i < response.daily.length; i++) {
                if (response.daily[i]) {

                    var card = $('<div>').addClass("card text-white bg-info mb-3 col");
                    var cardBody = $('<div>').addClass("card-body row");
                    var date = $("<h5>").addClass("date-forecast").html(response.daily[i].dt);
                    // var forecastDate = moment(date).format("DD/MM/YYYY");
                    var img = $("<img>").addClass("imageicon").attr("src", "https://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png");
                    var temp = $("<h5>").attr("id", "temp").addClass("date-forecast").text("Temperature: " + response.daily[i].temp.day);
                    var humid = $("<h5>").addClass("date-forecast").attr("id", "humid").text("Humidity: " + response.daily[i].humidity + "%");

                    card.append(cardBody);
                    cardBody.append(date, img, temp, humid);
                    $("#forecast").append(card);

                }
            }

            var uvIndex = $("<h4>").attr("id", "uv-index").text("UV Index: " + response.current.uvi);
            $("#uvi").append(uvIndex);

        })
}


$("#button").on("click", function () {
    var cityname = $("#cityname").val();
    var cityHistory = $("#city-history");
    citySubmit = $("<div>").attr("id", "citySubmit").text(cityname);
    cityHistory.append(citySubmit);
    localStorage.setItem("cityname", cityname);
})

$("#citySubmit").on("click", function () {
    $("#cityname").html("cityname");
    localStorage.getItem("cityname");
})