import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CittaDaSelezionare = ({ elenco }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnClick = (lat, lon, nome) => {
    const coord = String(lat) + " " + String(lon) + " " + String(nome);
    dispatch({
      type: "CITTA_RICHIESTA",
      payload: coord,
    });
    navigate(`/Meteo/dettagli-meteo`);
  };
  return (
    <ListGroup>
      {elenco.map((elem, i) => (
        <ListGroupItem
          key={i}
          onClick={() => {
            handleOnClick(elem.lat, elem.lon, elem.name);
          }}
        >
          <div className="d-flex justify-content-between">
            <p>
              {elem.name}, {elem.state}, {elem.country}
            </p>
            <p></p>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
export default CittaDaSelezionare;
