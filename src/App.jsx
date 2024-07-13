import './App.css'
import {useEffect, useState} from 'react'
// import search_icon from "./assets/search.png";
import rain_icon from "./assets/rain.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/Clouds.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";
import search_icon from './assets/._search.png'
const getWeatherIcon=(data)=>{
  switch (data.weather[0].main.toLowerCase()) {
    case 'rain':
      return rain_icon
    case 'clear':
      return cloud_icon
    case 'snow':
      return snow_icon
    case 'drizzle':
      return drizzle_icon
    case 'clouds':
      return cloud_icon
    default:
      return clear_icon
  }
}
async function getWeatherData(BASE_URL){
  let response= await fetch(BASE_URL)
  let data=response.json()
  return data
}

function App() { 
     
  const Weather = () => {
    const [location, setLocation] = useState('Mumbai');
    const [data, setData] = useState({})
    const [weatherIcon, setWeatherIcon] = useState(clear_icon)
        const API_KEY='fc06e75d3c5f113ff51b2ab554972284'
        const BASE_URL= `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`

    useEffect(() => {
      getWeatherData(BASE_URL).then((d)=>{
          setData(d)
          console.log(d);
          let icon=getWeatherIcon(data)
          setWeatherIcon(icon)
      })
    }, [location])
    return (
      
      <div className=" weather  min-h-full justify-center rounded-lg bg-red-500 p-5" >
        <div className="search-bar flex items-center min-w-full  gap-3" >
          <input type="text" value={location} onChange={(event)=>{setLocation(event.target.value);console.log(location);}} placeholder="Search"  className='rounded-full  h-10 p-5 rounded-[25px] min-w-[80%] border-none outline-none'/>
          
          <img src={search_icon} alt="search p-2 w-10 rounded-full cursor-pointer" />
        </div>
        <div className="align flex items-center justify-evenly">
          <img src={weatherIcon} alt="rain" className="weather-icon mt-20" />
          <div className="content flex flex-col items-center">
            <p className="temperature text-white text-[70px] leading-none mt-20" >{Math.round(data.main?.temp-273.15)||<p>No data found</p>}˚C</p>
            <p className="location text-white text-[40px]">{data.name}</p>
          </div>
        </div>

        <div className="weather-data w-full mt-10 text-white flex justify-between">
          <div className="col flex items-start gap-3 text-[22px] mt-10">
            <img src={humidity_icon} alt="humidity" />
            <div>
              <p >{data.main?.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col flex items-start gap-3 text-[22px] mt-10">
            <img src={wind_icon} alt="wind" />
            <div>
              <p>{data.wind?.speed}Km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  );
  };
  return Weather()
} 
export default App;
