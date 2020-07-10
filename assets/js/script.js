//this variable targets the id of hte input that contains the searched city
var cityInput = document.getElementById("cityname");
//this variable targets the id of the entire form
// var cityForm = document.querySelector("#city-form");
//this variable targets the id of the empty div under the form 
// var historyList = document.querySelector("#city-history");
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
            var cardBody = $('<div>').addClass("card-body");
            var title = $("<h3>").addClass("card-header text-uppercase").text(response.name);
            var temp = $("<h4>").attr("id", "temp").text("Temperature: " + response.main.temp);
            var humid = $("<h4>").attr("id", "humid").text("Humidity: " + response.main.humidity + "%");
            var wind = $("<h4>").attr("id", "wind").text("Wind Speed: " + response.wind.speed + "mph");
            // var uv = $("<h4>").attr("id", "uv");
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            title.append(img);
            cardBody.append(temp, humid, wind);
            card.append(title, cardBody);
            $("#today").append(card);
            fiveDay(cityname);
        })
}


var fiveDay = function (cityname) {
    var weatherCondition = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&appid=fe4831ea04035583e11d878e5799c1d9&units=imperial';
    $.ajax({
        type: "GET",
        url: weatherCondition,
        dataType: "json",
    })
    .then(function(response) {
        console.log(response); 
        $("#forecast").empty();

        for (i=0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("8:00:00") !== -1) {

                console.log(response.list[0].dt_txt.indexOf("08:00:00"));

                var card = $('<div>').addClass("card text-white bg-info mb-3 col");
                var cardBody = $('<div>').addClass("card-body");
                var date = $("<h5>").addClass("date-forecast").text(response.list[i].dt_txt);
                var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather.icon + ".png");
                var temp = $("<h5>").attr("id", "temp").addClass("date-forecast").text(response.list[i].main.temp);
                var humid = $("<h5>").attr("id", "humid").text(response.list[i].main.humidity);

                card.append(cardBody);
                cardBody.append(data, img, temp, humid);
                $("#forecast").append(card);
                
            }
        }
    })
}


//make a fetch request including the variable in the query url to get the weather for the city that was searched 
fetch('http://api.openweathermap.org/data/2.5/weather?q=locust,q=nc&appid=fe4831ea04035583e11d878e5799c1d9')

//         .then(function (response) {
//             return response.json();
//         })
// }
var getWeatherCondition = function (name) {
    var weatherCondition = 'http://api.openweathermap.org/data/2.5/weather' + name + '/appid=fe4831ea04035583e11d878e5799c1d9';

    // fetch ('http://api.openweathermap.org/data/2.5/weather?q=locust,q=nc&appid=fe4831ea04035583e11d878e5799c1d9')

    fetch(weatherCondition);
    console.log(weatherCondition);
}