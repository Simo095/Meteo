import { Col, Container, Row } from "react-bootstrap";
import { getWeatherIcon, getWeatherTranslation } from "../asset/js";

const ProssimiGiorni = ({ prossimi }) => {
  const giorni = Object.values(prossimi).map((giorno) => ({
    data: giorno.dt_txt.split(" ")[0].slice(5),
    icona: getWeatherIcon(giorno.weather[0].description),
    descrizione: getWeatherTranslation(giorno.weather[0].description),
    temperatura: (giorno.main.feels_like - 273.15).toFixed(1),
  }));

  return (
    <Container className="pt-3">
      <h5 className="mb-2">I prossimi 5 giorni</h5>
      <div className="forecast-box">
        {giorni.map((giorno, index) => (
          <div key={index} className="forecast-card">
            <Row className="text-center mb-3">
              <Col xs={6} sm={2}>
                <p>{giorno.data}</p>
              </Col>
              <Col xs={6} sm={3}>
                {giorno.icona}
              </Col>
              <Col xs={12} sm={4}>
                <p className="text-muted">{giorno.descrizione}</p>
              </Col>
              <Col xs={12} sm={3}>
                <p>{giorno.temperatura}°C</p>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProssimiGiorni;
