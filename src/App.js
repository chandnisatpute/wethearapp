import React,{useState, useEffect} from "react";
import axios from "axios";
import "./style.css";

const SearchBar = ({onSearch}) => {
  const [city, setCity]=useState("");

  const handleSearch = () => {
    onSearch(city);
  };

  return(
    <div className="search-bar">
      <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard=({title,data}) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};

const WeatherDisplay = ({city}) => {
  const [weatherData,setWeatherData]=useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(city){
      setLoading(true);
      axios
      .get(`https://api.weatherapi.com/v1/current.json`,{
        params: {
          key: "6012a8ad6f0d4c0cbf2111033251505",
          q: city
        }
      })
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to fetched weather data");
      })
      .finally(() => {
        setLoading(false);
      });
    }
  },[city]);

  return(
    <div className="weather-display">
      {loading && <p>Loading data...</p>}
      {loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard
          title="Temperature"
          data={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
          title="Humidity"
          data={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
          title="Condition"
          data={`${weatherData.current.condition.text}`}
          />
          <WeatherCard
          title="Wind Speed"
          data={`${weatherData.current.wind_kph} kph`}
          />
          </div>
      )}
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return(
    <div className="App">
      <SearchBar onSearch={handleSearch}/>
      <WeatherDisplay city={city}/>
    </div>
  );
};

export default App;