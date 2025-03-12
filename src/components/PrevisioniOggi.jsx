import { Col, Container, Row } from "react-bootstrap";
import {
  WiThermometer,
  WiHumidity,
  WiSnowflakeCold,
  WiHot,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { getWeatherIcon, getWeatherTranslation } from "../asset/js";
import Ricerca from "./Ricerca";

const PrevisioniOggi = ({
  percepita,
  minima,
  massima,
  umidita,
  vento,
  alba,
  tramonto,
  descrizione,
  nome,
  backgroundWeather,
}) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container
      fluid
      className="gradient-background"
      style={{
        ...backgroundWeather,
        color: descrizione.includes("rain") ? "white" : "black",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
      <Ricerca />
      <div className="shadow-sm bg-transparency position-fixed fixed-bottom w-75 m-auto p-3">
        <h4 className="text-center">A {nome} il Meteo è</h4>

        <Row className="text-center mb-3">
          <Col>{getWeatherIcon(descrizione)}</Col>
        </Row>
        <p className="text-center">{getWeatherTranslation(descrizione)}</p>
        <Row className="text-center">
          <Col>
            <WiThermometer size={50} />
            <p>Percepita: {percepita}°C</p>
          </Col>
          <Col>
            <WiHumidity size={50} />
            <p>Umidità: {umidita}%</p>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <WiSnowflakeCold size={50} />
            <p>Min: {minima}°C</p>
          </Col>
          <Col>
            <WiHot size={50} />
            <p>Max: {massima}°C</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <WiStrongWind size={50} />
            <p>Vento: {vento} km/h</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <WiSunrise size={50} />
            <p>Alba: {formatTime(alba)}</p>
          </Col>
          <Col>
            <WiSunset size={50} />
            <p>Tramonto: {formatTime(tramonto)}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PrevisioniOggi;
