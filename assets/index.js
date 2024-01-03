// Selecting elements from the DOM
const container=document.querySelector(".container")
const searchBtn=document.querySelector("#searchBtn")
const searchInput=document.querySelector("#searchInput")
const weatherBox=document.querySelector(".weather_box")
const weatherDetails=document.querySelector(".weather_details")
const error=document.querySelector(".not_found")
const cityHide=document.querySelector(".city_hide")


// Fetch Weather Data Function
const fetchWeatherData=()=>{
    const APIKey=`9bdf7649d23a35f5d8a16bc6b7ad7a78`
    const city=document.querySelector(".search_box input").value
    
    // Return if city is empty
    if(city == '')
    return;
    
    // API call
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(
        response=>response.json()).then(json=>{
             console.log(json);

            if(json.cod == '404'){
                cityHide.textContent=city
                container.style.height='400px'
                weatherBox.classList.remove('active')
                weatherDetails.classList.remove('active')
                error.classList.add('active')
                return
            }

           
            const image=document.querySelector(".weather_box img")
            const temperature=document.querySelector(".weather_box .temperature")
            const description=document.querySelector(".weather_box .description")
            const humidity=document.querySelector(".weather_details .humidity span")
            const wind=document.querySelector(".weather_details .wind span")
    

            if(cityHide.textContent == city ){
                return;
            }else{
                cityHide.textContent=city

                container.style.height='555px'
                container.classList.add('active')
                weatherBox.classList.add('active')
                weatherDetails.classList.add('active')
                error.classList.remove('active')

                setTimeout(()=>{
                    container.classList.remove('active')
                },2500);

                
                switch(json.weather[0].main){
                    case 'Clear':
                        image.src=`assets/images/clear.png`;
                        break;
                        case 'Clouds':
                            image.src=`assets/images/cloud.png`;
                            break;
                            case 'Mist':
                                image.src=`assets/images/fog.png`;
                                break;
                                case 'Haze':
                                    image.src=`assets/images/fog.png`;
                                    break;
                                case 'Snow':
                                    image.src=`assets/images/snow.png`;
                                    break;
                                    case 'Rain':
                                        image.src=`assets/images/rain.png`;
                                        break;
                                        case 'Wind':
                                            image.src=`assets/images/wind.png`;
                                            break;
                    default:
                        image.src=`assets/images/cloud.png`
                        break;
                }
    
                temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`
                description.innerHTML=`${json.weather[0].description}`
                humidity.innerHTML=`${json.main.humidity} %`
                wind.innerHTML=`${parseInt(json.wind.speed)} Km/h`



                 // Clone and manage weather, wind, and humidity info elements
                const infoWeather=document.querySelector(".info_weather")
                const infoWind=document.querySelector(".info_wind")
                const infoHumidity=document.querySelector(".info_humidity")

                const elCloneInfoWeather=infoWeather.cloneNode(true)
                const elCloneInfoWind=infoWind.cloneNode(true)
                const elCloneInfoHumidity=infoHumidity.cloneNode(true)

                elCloneInfoWeather.id='clone-info-weather'
                elCloneInfoWeather.classList.add('active-clone')

                elCloneInfoWind.id='clone-info-wind'
                elCloneInfoWind.classList.add('active-clone')

                elCloneInfoHumidity.id='clone-info-humidity'
                elCloneInfoHumidity.classList.add('active-clone')

                setTimeout(()=>{
                    infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather)
                    infoWind.insertAdjacentElement("afterend",elCloneInfoWind)
                    infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity)
                },2200)

                const cloneInfoWeather=document.querySelectorAll(".info_weather.active-clone")
                const totalCloneInfoWeather=cloneInfoWeather.length
                const cloneInfoWeatherFirst=cloneInfoWeather[0]

                const cloneInfoWind=document.querySelectorAll(".info_wind.active-clone")
                const cloneInfoWindFirst=cloneInfoWind[0]

                const cloneInfoHumidity=document.querySelectorAll(".info_humidity.active-clone")
                const cloneInfoHumidityFirst=cloneInfoHumidity[0]

                if(totalCloneInfoWeather > 0){
                    cloneInfoWeatherFirst.classList.remove('active-clone')
                    cloneInfoWindFirst.classList.remove('active-clone')
                    cloneInfoHumidityFirst.classList.remove('active-clone')

                    setTimeout(()=>{
                        cloneInfoWeatherFirst.remove()
                        cloneInfoWindFirst.remove()
                        cloneInfoHumidityFirst.remove()
                    },2200)
                }
            }

        })
}

// Event listener for search button click
searchBtn.addEventListener("click", fetchWeatherData);
// Event listener for 'Enter' key press
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeatherData();
    }
});


