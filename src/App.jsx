import { useEffect, useState } from "react";
import "./App.css";
import browser from "./assets/browser.svg";
import loader from "./assets/loader.svg";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then((response) => {
        console.log(response);
        /* 400 - 499 : erreur clients */
        /* 500 - 599 : erreur serveur */
        if (!response.ok)
          throw new Error(`Error ${response.status}, ${respons.statusText}`);

        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        setWeatherData({
          city: responseData.data.city,
          state: responseData.data.state,
          iconId: responseData.data.current.weather.ic,
          tp: responseData.data.current.weather.tp,
        });
      })
      .catch((err) => {
        setErrorInfo(err.message);
      });
  }, []);

  return (
    <main>
      <div
        className={`loader-container ${!weatherData && !errorInfo && "active"}`}
      >
        <img src={loader} alt="loader icon" />
      </div>

      {weatherData && (
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="country-state">{weatherData.state}</p>
          <p className="temperature">{weatherData.tp}°</p>
          <div className="info-icon-container">
            <img
              src={`/icons/${weatherData.iconId}.svg`}
              className="info-icon"
              alt="weather icon"
            />
          </div>
        </>
      )}

      {errorInfo && !weatherData && (
        <>
          <p className="error-information">{errorInfo}</p>
          <img src={browser} alt="icon-error" />
        </>
      )}
    </main>
  );
}

export default App;
