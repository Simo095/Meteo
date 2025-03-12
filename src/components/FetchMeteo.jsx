import { useEffect, useState } from "react";
import { Spinner, Container, Row, Col, Card } from "react-bootstrap";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import Footer from "./Footer";
import {
  getWeatherGradient,
  getWeatherIcon,
  getWeatherIconUrl,
  getWeatherTranslation,
} from "../asset/js";
import { useParams } from "react-router-dom";

const FetchMeteo = () => {
  const { lat, lon, nome } = useParams();
  const [meteoOggi, setMeteoOggi] = useState(null);
  const [prossimeOre, setProssimeOre] = useState([]);
  const [prossimiGiorni, setProssimiGiorni] = useState([]);
  const [backgroundWeather, setBackgroundWeather] = useState();

  const fetchDettagli = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9c0ece9ecabc211f28776c581ffc21e8`
      );
      if (response.ok) {
        const data = await response.json();

        setBackgroundWeather(
          getWeatherGradient(data.weather[0].description.toLowerCase())
        );
        console.log(
          "data",
          getWeatherGradient(data.weather[0].description.toLowerCase())
        );
        console.log("data", data);
        setMeteoOggi({
          percepita: (data.main.feels_like - 273.15).toFixed(1),
          temp: (data.main.temp - 273.15).toFixed(1),
          minima: (data.main.temp_min - 273.15).toFixed(1),
          massima: (data.main.temp_max - 273.15).toFixed(1),
          umidita: data.main.humidity,
          vento: (data.wind.speed * 3.6).toFixed(1),
          alba: data.sys.sunrise,
          tramonto: data.sys.sunset,
          descrizione: data.weather[0].description,
          icona: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      } else {
        alert("Errore nel recupero dei dati meteo.");
      }
    } catch (error) {
      console.error("Errore nel fetch meteo oggi:", error);
    }
  };

  const fetchPrevisioni = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9c0ece9ecabc211f28776c581ffc21e8`
      );
      if (response.ok) {
        const data = await response.json();
        const ore = data.list.slice(0, 8).map((item) => ({
          orario: new Date(item.dt * 1000).toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temp: (item.main.temp - 273.15).toFixed(1),
          vento: (item.wind.speed * 3.6).toFixed(1),
          icona: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));
        console.log("ore", ore);
        setProssimeOre(ore);
        const giorni = [7, 15, 23, 31, 39].map((i) => {
          const giorno = data.list[i];
          return {
            data: new Date(giorno.dt * 1000).toLocaleDateString("it-IT", {
              weekday: "long",
            }),
            temp: (giorno.main.temp - 273.15).toFixed(1),
            icona: `https://openweathermap.org/img/wn/${giorno.weather[0].icon}@2x.png`,
            descrizione: giorno.weather[0].description,
          };
        });
        setProssimiGiorni(giorni);
      } else {
        alert("Errore nel recupero delle previsioni.");
      }
    } catch (error) {
      console.error("Errore nel fetch previsioni:", error);
    }
  };

  useEffect(() => {
    fetchDettagli();
    fetchPrevisioni();
    // eslint-disable-next-line
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container
      fluid
      style={{
        ...backgroundWeather,
        color:
          meteoOggi && meteoOggi.descrizione.includes("rain")
            ? "white"
            : "black",
        minHeight: "100vh",
      }}
      className="py-5"
    >
      {meteoOggi ? (
        <Card
          style={{
            color:
              meteoOggi && meteoOggi.descrizione.includes("rain")
                ? "white"
                : "black",
          }}
          className="text-center bg-transparent border-0 p-3 shadow-sm"
        >
          <Card.Title>Meteo attuale - {nome}</Card.Title>
          <Card.Body>
            {getWeatherIcon(meteoOggi.descrizione)}
            <p>{getWeatherTranslation(meteoOggi.descrizione)}</p>
            <Row>
              <Col>
                <WiThermometer size={80} />
                <p>{meteoOggi.temp}°C</p>
              </Col>
              <Col>
                <WiHumidity size={80} />
                <p>Umidità: {meteoOggi.umidita}%</p>
              </Col>
              <Col>
                <WiStrongWind size={80} />
                <p>Vento: {meteoOggi.vento} km/h</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <WiSunrise size={80} />
                <p>Alba: {formatTime(meteoOggi.alba)}</p>
              </Col>
              <Col>
                <WiSunset size={80} />
                <p>Tramonto: {formatTime(meteoOggi.tramonto)}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
      <h4 className="mt-4">Previsioni Prossime Ore</h4>
      <Container className="d-flex text-center overflow-x-scroll">
        {prossimeOre.map((ora, i) => (
          <div key={i} className="p-2">
            <Card
              style={{
                color:
                  meteoOggi && meteoOggi.descrizione.includes("rain")
                    ? "white"
                    : "black",
              }}
              className="bg-transparent border-0 text-center"
            >
              <Card.Body>
                <p>{ora.orario}</p>
                {getWeatherIconUrl(ora.icona)}
                <p>{ora.temp}°C</p>
                <p>Vento: {ora.vento} km/h</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Container>
      <h4 className="mt-4">Previsioni Prossimi Giorni</h4>
      <Container className="d-flex justify-content-center overflow-x-scroll">
        {prossimiGiorni.map((giorno, i) => (
          <div key={i} className="p-2">
            <Card
              style={{
                color:
                  meteoOggi && meteoOggi.descrizione.includes("rain")
                    ? "white"
                    : "black",
              }}
              className="bg-transparent border-0 text-center"
            >
              <Card.Body>
                <p>{giorno.data}</p>
                {getWeatherIcon(giorno.descrizione)}

                <p>{giorno.temp}°C</p>
                <p>{getWeatherTranslation(giorno.descrizione)}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Container>
      {meteoOggi && <Footer descrizione={meteoOggi.descrizione} />}
    </Container>
  );
};

export default FetchMeteo;
