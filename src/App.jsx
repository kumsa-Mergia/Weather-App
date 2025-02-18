import React, { useState } from "react";
import axios from "axios";

const App = () => {
  // Initialize the state for 'data' correctly
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&exclude=current&limit=5&appid=a89c714d994a9a01f13358c9f927984d`;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        // Make sure to check if the response data is not empty before accessing its properties
        if (response.data.length > 0) {
          setData(response.data[0]); // Use the first location in the array
        }
        console.log(response.data);
      })
      setLocation('');
    }
  };

  return (
    <>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter Location" 
          type="text" />
      </div>
      <div className="container">
        {/* Top Section */}
        <div className="top">
          <div className="location">
            <p>{data.name}</p> {/* Display the location name */}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}</h1> : null } {/* Display the temperature */}
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].description : null}</p> {/* Weather description */}
          </div>
        </div>
        {/* Bottom Section */}
        <div className="bottom">
          <div className="feels">
            <p className="bold">{data.main ? `${data.main.feels_like} °F` : null}</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.main ? `${data.main.humidity}%` : null}</p>
          </div>
          <div className="wind">
            <p className="bold">{data.wind ? `${data.wind.speed} MPH` : null}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
