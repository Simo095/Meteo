import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CittaDaSelezionare = ({ elenco }) => {
  const navigate = useNavigate();

  const handleOnClick = (lat, lon, nome) => {
    navigate(`/Meteo/dettagli-meteo/${lat}/${lon}/${nome}`);
  };
  return (
    <ListGroup style={{ zIndex: 9999 }} className="w-50">
      {elenco.map((elem, i) => (
        <ListGroupItem
          key={i}
          onClick={() => {
            handleOnClick(elem.lat, elem.lon, elem.name);
          }}
        >
          <p>
            {elem.name}, {elem.state}, {elem.country}
          </p>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
export default CittaDaSelezionare;
