//DOM elements

let city = document.getElementById('city');
let temperature = document.getElementById('temp');
let minMaxTemp = document.getElementById('min-max');
let weatherType = document.getElementById('weather');
let searchInputBox = document.getElementById('input-box');
let date = document.getElementById('date');
let logo = document.getElementById('img');

const weatherApi = {
    key: "e90c661a5f7a3918d35c13fc9854fd1c",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
};


//event listner func on keypress
searchInputBox.addEventListener('keypress', (e)=>{
    if(e.keyCode == 13){
      getWeatherReport(searchInputBox.value);
      document.querySelector('.weather-body').style.display = "block"; 
      document.querySelector('.anim').style.display = "none"; 
    }
   
})

//get weather report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showWeatherReport)
    .catch((err) => {
        city.innerHTML=''
        city.innerText=''
        date.innerHTML=''
        weatherType.innerHTML = 
        `<p style="font-size: 2rem">City<br>Not<br>Found</p>`;
        minMaxTemp.innerHTML = '';
        temperature.innerText = '';
        logo.innerHTML = `<br><img src="images/error.png" style="height:3rem; width: 4.3rem;" />`;
    });
}

//show weather report
function showWeatherReport(weather){
    city.innerText = `${weather.name},${weather.sys.country}`;

    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C  (max)`;

    weatherType.innerText = `${weather.weather[0].main}`;

    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
        logo.innerHTML = `<img src="http://openweathermap.org/img/wn/01d@2x.png" />`;
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        logo.innerHTML = `<img src="http://openweathermap.org/img/wn/03d@2x.png" />`;
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/haze.jpg')";
        logo.innerHTML = `<img src="http://openweathermap.org/img/wn/50d@2x.png" />`;
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        logo.innerHTML = `<img src="http://openweathermap.org/img/wn/10d@2x.png" />`;
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
        logo.innerHTML = `<img src="http://openweathermap.org/img/wn/13d@2x.png" />`;
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        logo.innerHTML = `<img src="http://openweathermap.org/img/wn/11d@2x.png" />`;
        
    } 
}

//date manage func
function dateManage(dateArg){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

