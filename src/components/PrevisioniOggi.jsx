import { Col, Row } from "react-bootstrap";
import {
  WiThermometer,
  WiHumidity,
  WiSnowflakeCold,
  WiHot,
} from "react-icons/wi";
import { getWeatherIcon, getWeatherTranslation } from "../asset/js";

const PrevisioniOggi = ({
  percepita,
  minima,
  massima,
  umidita,
  descrizione,
  nome,
}) => {
  return (
    <div className="shadow-sm bg-transparency">
      <h4 className="text-center">{nome}</h4>
      <Row className="text-center mb-3">
        <Col>{getWeatherIcon(descrizione)}</Col>
      </Row>
      <p className="text-center text-muted">
        {getWeatherTranslation(descrizione)}
      </p>
      <Row className="text-center">
        <Col>
          <WiThermometer size={30} />
          <p>Percepita: {percepita}°C</p>
        </Col>
        <Col>
          <WiHumidity size={30} />
          <p>Umidità: {umidita}%</p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <WiSnowflakeCold size={30} />
          <p>Min: {minima}°C</p>
        </Col>
        <Col>
          <WiHot size={30} />
          <p>Max: {massima}°C</p>
        </Col>
      </Row>
    </div>
  );
};

export default PrevisioniOggi;
