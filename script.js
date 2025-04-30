const input = document.querySelector("#input");
const seachBtn = document.querySelector(".btn");
const temperature = document.querySelector(".temp");
const cityName = document.querySelector("#city");
const dateTime = document.querySelector("#time");
const weatherTxt = document.querySelector("#weather-status");
const weatherImage = document.querySelector("#image");
const min = document.querySelector("#min");
const max = document.querySelector("#max");
const Feels = document.querySelector("#Feels");
const humidity = document.querySelector("#humidity");
const windTxt = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const loader = document.querySelector(".load-container");

// Inbuild js Api which take country code like "IN" and return its full name : India
const getCountryName = (countrycode) => {
    const regionNamesInEnglish = new Intl.DisplayNames([countrycode], { type: "region" });
    return regionNamesInEnglish.of(countrycode);
   
}
// The function that returns the formated date and time 

const getDateandTime = (dt)=>{
    const currDate = new Date(dt * 1000);

    const options = {
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric",
        hour : "numeric",
        minute : "numeric"
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);

    return formatter.format(currDate)
    
}


// function that handle the Api request and take city name as argument 
const getWeatherData = async (city) => {

    loader.style.display = "flex";
    // warning Don't use this Api code and the same url. Go to openweather api and generate your new one api code
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b17f542a4555257fda46996f974943f&units=metric`
    try {

        const response = await fetch(weatherUrl);
        const data = await response.json()
        const { main, name, weather, wind, sys, dt } = data;

        loader.style.display = "none";
        // show name and country 
        cityName.innerHTML = ` ${name},${getCountryName(sys.country)}`;
        
        dateTime.innerHTML = getDateandTime(dt);

        weatherTxt.innerHTML = `${weather[0].main}`
        temperature.innerHTML = `${Math.floor(main.temp)}°C`;
        min.innerHTML = `Min : ${Math.floor(main.temp_min)}°C`;
        max.innerHTML = `Max : ${Math.floor(main.temp_max)}°C`;
        humidity.innerHTML = `${main.humidity}%`;
        pressure.innerHTML = `${main.pressure} hPa`;
        Feels.innerHTML =`${Math.floor(main.feels_like)}°C`;
        windTxt.innerHTML = `${wind.speed} m/s`;
       weatherImage.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    } catch (err) {
        console.log(err);

    }

}

const SearchWeather = ()=>{
    if(input.value == ""){
        alert("Pease Enter A city");
        return;
    }
    let city = input.value.trim().toLowerCase()
    getWeatherData(city);
    input.value = ""
}


    seachBtn.addEventListener("click", ()=>{
       SearchWeather()
    })


    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') { 
         SearchWeather()
        }
    });

document.body.addEventListener("load", getWeatherData("aurangabad"));