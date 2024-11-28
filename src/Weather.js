import React, { useState, useEffect } from "react";
import axios from "axios";
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");

  const API_KEY = "6cbefc9c58c91dbe7fdbbf5acdec9f33"; 

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleTimeString();
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name"
        />
        <br></br>
        <br/>
        <button type="submit">Search</button>
      </form>
      {weatherData ? (
        <div className="weather-details">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p><strong>Condition:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°C</p>
          <p><strong>Min Temp:</strong> {weatherData.main.temp_min}°C</p>
          <p><strong>Max Temp:</strong> {weatherData.main.temp_max}°C</p>
          <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Visibility:</strong> {weatherData.visibility / 1000} km</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Wind Direction:</strong> {weatherData.wind.deg}°</p>
          <p><strong>Sea Level Pressure:</strong> {weatherData.main.sea_level || "N/A"} hPa</p>
          <p><strong>Sunrise:</strong> {formatTime(weatherData.sys.sunrise)}</p>
          <p><strong>Sunset:</strong> {formatTime(weatherData.sys.sunset)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
