import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Qui l'utente decide la citta di cui vuole sapere le previsioni e dopo aver cliccato su quella che gli interessa mando il dato della lat lon e nome allo store per averlo disponibile in tutti componenti

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
    ///${lat}/${lon} da usare con use params
  };
  return (
    <>
      <div style={{ width: "50%", marginInline: "auto" }}>
        <h2>Which city</h2>
        <ListGroup>
          {elenco.map((elem, i) => {
            return (
              <ListGroupItem
                key={i}
                className="menu-citta"
                onClick={() => {
                  handleOnClick(elem.lat, elem.lon, elem.name);
                }}
              >
                <div className="d-flex justify-content-between">
                  <p>{elem.name}</p>
                  <p>
                    {elem.country}, {elem.state}
                  </p>
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    </>
  );
};
export default CittaDaSelezionare;
