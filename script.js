let weather = {
    apiKey: "2681f97cfb330300769919b6c824491e",
    fetchWeather: function (city) {
        // create a fetch request 
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        // get back the promise from the fetch request and make sure it returned OK
        .then((response) => {
        
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            // convert the returned http response and convert it to json data
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {

        console.log(data);

        // get the data out of the api call
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        const { temp_max, temp_min } = data.main;
        const { sunrise, sunset } = data.sys;

        // load the data into the elements on our HTML page
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".feels").innerText = "Feels like " + feels_like + "°C";

        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h " + convert_wind_direction(data.wind.deg);

        document.querySelector(".max").innerText = "High temperature " + temp_max + "°C";
        document.querySelector(".min").innerText = "Low temperature " + temp_min + "°C";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        
        var city = document.querySelector(".search-bar").value;

        // use regex to replacec the space in cities with 2 words with a + sign
        city = city.replace(/ /g,"+");

        this.fetchWeather(city);
    },
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
  
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Fredericton");

// take the wind direction in degrees and convert it to a cardinal direction
function convert_wind_direction(degree) {

    if(degree >= 350 || (degree >= 0  && degree <= 10)){
        return "N";
    }else if(degree >= 80 && degree <= 100){
        return "E";
    }else if(degree >= 170 && degree <= 190){
        return "S";
    }else if(degree >= 260 && degree <= 280){
        return "W";
    }else if(degree > 10 && degree < 80){
        return "NE";
    }else if(degree > 100 && degree < 170){
        return "SE";
    }else if(degree > 190 && degree < 260){
        return "SW";
    }else{
        return "NW";
    }
}

// takes in a variable in celsius and converts it to fahrenheit
function cToF(celsius) {

    return fahrenheit = celsius * 9 / 5 + 32;
}
function convert_time(timestamp) {
    
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formatted_time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // check correct time format and split into components
    var time = formatted_time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [formatted_time];

    // if time format correct
    if (time.length > 1) {  
        time = time.slice(1);                       // remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM';      //  set am/pm
        time[0] = +time[0] % 12 || 12;              // adjust hours
    }
    return time.join('');
}
