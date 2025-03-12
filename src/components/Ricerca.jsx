import { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";

import CittaDaSelezionare from "./CittaDaSelezionare";

const Ricerca = ({ nome, descrizione }) => {
  const [elencoCitta, setElencoCitta] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeout = useRef(null);

  const fetchCoord = async (citta) => {
    if (!citta || citta.length < 3) {
      setElencoCitta(null);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${citta}&limit=10&appid=9c0ece9ecabc211f28776c581ffc21e8`
      );
      if (response.ok) {
        const arrayCitta = await response.json();
        setElencoCitta(arrayCitta);
      } else {
        console.error("Error fetching results");
        setElencoCitta(null);
      }
    } catch (error) {
      console.error(error);
      setElencoCitta(null);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        fetchCoord(searchTerm);
      }, 300);
    } else {
      setElencoCitta(null);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-between pt-5">
      <Form.Control
        className="w-50"
        type="text"
        placeholder="Ricerca una Città..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {elencoCitta && (
        <CittaDaSelezionare elenco={elencoCitta}></CittaDaSelezionare>
      )}
    </div>
  );
};

export default Ricerca;
