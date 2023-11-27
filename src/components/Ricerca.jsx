import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import CittaDaSelezionare from "./CittaDaSelezionare";
const Ricerca = () => {
  //Utilizzo stato di questo componente per chiedere all'utente di quale citta ha bisogno di sapere le previsioni.
  const [elencoCitta, setElencoCitta] = useState(null);
  //fetchCoord trova tutte le citta che corrispondo al nome inserito dall'utente e salva l'array nello stato di questo componente
  const fetchCoord = async citta => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${citta}&limit=10&appid=9c0ece9ecabc211f28776c581ffc21e8`
      );
      if (response.ok) {
        const arrayCitta = await response.json();
        setElencoCitta(arrayCitta);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Serve a gestire la richiesta dell'utente sulla citta e manda i dato a fetch
  const heandlerForm = event => {
    event.preventDefault();
    fetchCoord(event.target[0].value);
  };

  return (
    <div className="d-flex flex-column flex-grow-1 ">
      <h2>Search a city for know the weather</h2>
      <Form onSubmit={heandlerForm}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Write here..."
          />
        </Form.Group>
        <Button
          type="submit"
          className="btn-gen">
          Search
        </Button>
      </Form>
      {/* Quando la fetch mi risponde trovo diverse citta con lo stesso nome e con questo componente faccio decidere all'utente a quale si riferisse*/}
      {elencoCitta && <CittaDaSelezionare elenco={elencoCitta}></CittaDaSelezionare>}
    </div>
  );
};
export default Ricerca;
