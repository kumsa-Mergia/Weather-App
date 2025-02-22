import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // const apiKey = process.env.REACT_APP_WEATHER_API_KEY; 
  const apiKey = process.env.VITE_WEATHER_API_KEY; // Access the API key

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setData({});
        });
      setLocation("");
    }
  };

  return (
    <>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        {/* Top Section */}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp} °C</h1> : null} {/* Added degree C symbol*/}
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].description : null}</p>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="bottom">
          <div className="feels">
            <p className="bold">
              {data.main ? `${data.main.feels_like} °C` : null} {/*Added degree C symbol*/}
            </p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.main ? `${data.main.humidity}%` : null}</p> {/*Added percentage symbol*/}
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{data.wind ? `${data.wind.speed} m/s` : null}</p> {/*Added units*/}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;