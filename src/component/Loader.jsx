import React, { useEffect, useState } from "react";
import browser from "../assets/browser.svg";
import loader from "../assets/loader.svg";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function Loader() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then((response) => {
        console.log(response);
        /* 400 - 499 : erreur clients */
        /* 500 - 599 : erreur serveur */
        if (!response.ok)
          throw new Error(`Error ${response.status}, ${response.statusText}`);

        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        setWeatherData({
          city: responseData.data.city,
          state: responseData.data.state,
          iconId: responseData.data.current.weather.ic,
          tp: responseData.data.current.weather.tp,
          ws: responseData.data.current.weather.ws,
          wd: responseData.data.current.weather.wd,
        });
      })
      .catch((err) => {
        setErrorInfo(err.message);
      });
  }, []);

  return (
    <div>
      <main>
        <div
          className={`loader-container ${
            !weatherData && !errorInfo && "active"
          }`}
        >
          <img src={loader} alt="loader icon" />
        </div>

        {weatherData && (
          <>
            <p className="city-name">{weatherData.city}</p>
            <p className="country-state">{weatherData.state}</p>
            <p className="temperature">{weatherData.tp}°</p>
            <p className="wind-speed">{weatherData.ws} m / s</p>
            <p className="wind-direction">Direction {weatherData.wd}°</p>

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
            <img src={browser} alt="erro icon" />
          </>
        )}
      </main>
    </div>
  );
}
