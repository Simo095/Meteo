import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrevisioniOggi from "./PrevisioniOggi";
import ProssimiGiorni from "./ProssimiGiorni";
import { Spinner } from "react-bootstrap";
//----------------------------------
//import { Link, useParams } from "react-router-dom";

//Qui ho a disposizione i dati che ha deciso l'utente e faccio due fetch al caricamento della pagina
//una per le previsioni attuali e una per le previsioni dei prossimi 5 giorni prendendo solo gli array dei prossimi 5 giorni a mezzo giorno.

const FetchMeteo = () => {
  //gestione della stringa salvata nello store per le coordinate
  const coordinate = useSelector(state => state.datiFormCitta.coord);
  const str = coordinate.split(" ");
  const lat = str[0];
  const lon = str[1];
  const nome = str[2];

  // const params = useParams();
  // const lat = params.lat;
  // const lon = params.lon;

  const [temp, setTemp] = useState(null);
  const [prossimiGiorni, setProssimiGiorni] = useState(null);

  const fetchDettagli = async () => {
    try {
      const response = await fetch(
        `https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}10&appid=9c0ece9ecabc211f28776c581ffc21e8`
      );
      if (response.ok) {
        const previsione = await response.json();

        //creo oggetto da impostare nello stato locale del componente per rendere disponibili i dati al componente stesso.
        const objToday = {
          img: `https://openweathermap.org/img/wn/${previsione.weather[0].icon}@2x.png`,
          percepita: (previsione.main.feels_like - 273.15).toFixed(1),
          temp: (previsione.main.temp - 273.15).toFixed(1),
          umidita: previsione.main.humidity,
          minima: (previsione.main.temp_min - 273.15).toFixed(1),
          massima: (previsione.main.temp_max - 273.15).toFixed(1),
          descrizione: previsione.weather[0].description
        };
        setTemp({ objToday });
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDettagliProssimi = async () => {
    try {
      const response = await fetch(
        `https:api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}10&appid=9c0ece9ecabc211f28776c581ffc21e8`
      );
      if (response.ok) {
        const prossimi = await response.json();
        const primo = prossimi.list[7];
        const secondo = prossimi.list[15];
        const terzo = prossimi.list[23];
        const quarto = prossimi.list[31];
        const quinto = prossimi.list[39];
        //Qui si crea l'oggetto dei prossimi 5 giorni
        const objGiorni = {
          primo: primo,
          secondo: secondo,
          terzo: terzo,
          quarto: quarto,
          quinto: quinto
        };
        setProssimiGiorni(objGiorni);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //QUI FETCH AL PRIMO RENDER, SEMPRE!!!
  useEffect(() => {
    fetchDettagli();
    fetchDettagliProssimi();
  }, []);

  return (
    <div className="FetchMeteo">
      <div className="d-flex justify-content-center gap-5">
        <h2>{nome}</h2>
      </div>
      {temp ? (
        <PrevisioniOggi
          percepita={temp.objToday.percepita}
          minima={temp.objToday.minima}
          massima={temp.objToday.massima}
          umidita={temp.objToday.umidita}
          descrizione={temp.objToday.descrizione}
          img={temp.objToday.img}></PrevisioniOggi>
      ) : (
        <PrevisioniOggi
          percepita="-- --"
          minima="-- --"
          massima="-- --"
          umidita="-- --"
          descrizione="-- --"
          img="-- --"></PrevisioniOggi>
      )}
      {prossimiGiorni ? (
        <ProssimiGiorni prossimi={prossimiGiorni}></ProssimiGiorni>
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5">
          <Spinner
            animation="border"
            variant="light"
          />
        </div>
      )}
    </div>
  );
};
export default FetchMeteo;
