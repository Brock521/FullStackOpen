import { useEffect, useState } from "react";
import axios from 'axios';

const api_key = import.meta.env.VITE_SOME_KEY

export default function Country({country}){
    const [temperature, setTemperature] = useState(null);
    const [wind, setWind] = useState(null);
    const [weatherIconSrc, setWeatherImage] = useState(null);
    const [weather, setWeather] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    
    useEffect(()=>{
      

      axios.get('http://api.openweathermap.org/geo/1.0/direct?q='.concat(country.capital).concat('&appid='+api_key)).then((response)=>{
          let lat = response.data[0].lat;
          let lon = response.data[0].lon;
          axios.get('https://api.openweathermap.org/data/2.5/weather?'.concat("lat=" + lat).concat("&lon=" + lon).concat("&units=metric").concat("&appid=" + api_key)).then((response)=>{ 

            const responseTemp = response.data.main.temp;
            const responseWind = response.data.wind.speed;
            const responseWeather = response.data.weather[0].main;
            const responseWeatherIconSrc = 'https://openweathermap.org/img/wn/'.concat(response.data.weather[0].icon).concat('@2x.png');
            const responseFeelsLike = response.data.main.feels_like;
            
            setTemperature(responseTemp);
            setWind(responseWind);
            setWeather(responseWeather);
            setWeatherImage(responseWeatherIconSrc)
            setFeelsLike(responseFeelsLike);
        });


      });
    },[country])

    console.log("In country" + country.languages);
    return(
    <>
        <h2>{country.name.common}</h2>
        <p>Capital City: {country.capital}</p>
        <p>Area: {country.area}</p>
        <b>Languages:</b>
        
        <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li> 
        ))}
      </ul>

        <img src={country.flags.png} alt={country.flags.alt}></img>
        
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {temperature} C., Feels Like: {feelsLike} C.</p>
        <p>{weather}</p>
        <p><img src={weatherIconSrc}></img></p>
        
        <p>Wind: {wind} m/s</p>
      </>

);


}