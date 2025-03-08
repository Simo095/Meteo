import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ricerca from "./components/Ricerca";
import FetchMeteo from "./components/FetchMeteo";
import { getWeatherGradient } from "./asset/js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [backgroundT, setBackgroundT] = useState(
    getWeatherGradient("clear sky")
  );
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Posizione rilevata: ${latitude}, ${longitude}`);

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9c0ece9ecabc211f28776c581ffc21e8`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              const descrizione = data.weather[0].description.toLowerCase();
              const nome = data.name;
              setBackgroundT(getWeatherGradient(descrizione));
              setNome(nome);
              setDescrizione(descrizione);
            })
            .catch(() => {
              setBackgroundT(getWeatherGradient("clear sky"));
            });
        },
        () => {
          console.error("Impossibile ottenere la posizione, uso default.");
          setBackgroundT(getWeatherGradient("clear sky"));
        }
      );
    } else {
      console.error("Geolocalizzazione non supportata.");
      setBackgroundT(getWeatherGradient("clear sky"));
    }
  }, []);

  return (
    <div
      className="App d-flex overflow-y-scroll gradient-background"
      style={{
        ...backgroundT,
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Container className="text-center d-flex flex-column">
          <Routes>
            <Route
              path="/Meteo"
              element={<Ricerca nome={nome} descrizione={descrizione} />}
            />
            <Route path="/Meteo/dettagli-meteo" element={<FetchMeteo />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
