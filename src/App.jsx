import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrevisioniOggi from "./components/PrevisioniOggi";
import FetchMeteo from "./components/FetchMeteo";
import { getWeatherGradient } from "./asset/js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [backgroundWeather, setBackgroundWeather] = useState(
    getWeatherGradient("clear sky")
  );
  const [weatherNow, setWeatherNow] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9c0ece9ecabc211f28776c581ffc21e8`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setBackgroundWeather(
                getWeatherGradient(data.weather[0].description.toLowerCase())
              );
              setWeatherNow({
                nome: data.name,
                percepita: (data.main.feels_like - 273.15).toFixed(1),
                temp: (data.main.temp - 273.15).toFixed(1),
                umidita: data.main.humidity,
                minima: (data.main.temp_min - 273.15).toFixed(1),
                massima: (data.main.temp_max - 273.15).toFixed(1),
                vento: (data.wind.speed * 3.6).toFixed(1),
                alba: data.sys.sunrise,
                tramonto: data.sys.sunset,
                descrizione: data.weather[0].description,
              });
            })
            .catch(() => {
              setBackgroundWeather(getWeatherGradient("clear sky"));
            });
        },
        () => {
          console.error("Impossibile ottenere la posizione, uso default.");
          setBackgroundWeather(getWeatherGradient("clear sky"));
        }
      );
    } else {
      console.error("Geolocalizzazione non supportata.");
      setBackgroundWeather(getWeatherGradient("clear sky"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Meteo"
          element={
            weatherNow && (
              <PrevisioniOggi
                nome={weatherNow.nome}
                percepita={weatherNow.percepita}
                minima={weatherNow.minima}
                massima={weatherNow.massima}
                umidita={weatherNow.umidita}
                vento={weatherNow.vento}
                alba={weatherNow.alba}
                tramonto={weatherNow.tramonto}
                descrizione={weatherNow.descrizione}
                backgroundWeather={backgroundWeather}
              />
            )
          }
        ></Route>
        <Route
          path="/Meteo/dettagli-meteo/:lat/:lon/:nome"
          element={<FetchMeteo />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
