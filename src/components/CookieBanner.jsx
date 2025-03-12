import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptCookies, resetCookies } from "../redux/reducer/cookieSlice";
import { Button, Container } from "react-bootstrap";

const COOKIE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

const CookieBanner = () => {
  const dispatch = useDispatch();
  const { hasAcceptedCookies, acceptedAt } = useSelector(
    (state) => state.cookies
  );
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const now = Date.now();
    if (
      !hasAcceptedCookies ||
      (acceptedAt && now - acceptedAt > COOKIE_EXPIRATION_TIME)
    ) {
      dispatch(resetCookies());
      setShowBanner(true);
    }
  }, [hasAcceptedCookies, acceptedAt, dispatch]);

  const handleAccept = () => {
    dispatch(acceptCookies());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="p-1 position-fixed w-100 text-center"
        style={{
          bottom: 0,
          left: 0,
          backgroundColor: "#123650",
          color: "aliceblue",
          zIndex: 10000,
        }}
      >
        <p className="m-0 p-0 " style={{ fontSize: "0.9em" }}>
          Questo sito utilizza la tua posizione per ottenere le informazioni
          riguardo il meteo attuale nella tua posizione e nient'altro. Premendo
          su "non consetire mai", il sito non risponderà. Inoltre utilizza
          tecnologie simili ai cookies per migliorare la tua esperienza di
          navigazione. Redux Persist è una libreria per la persistenza di dati
          nello spazio di archiviazione del browser, come lo storage locale per
          mantenere le tue preferenze, e anche informazioni del sito stesso.
          Cliccando su 'Ok!', acconsenti all'uso dei cookie e puoi proseguire la
          navigazione.
        </p>
        <Container fluid className="text-end m-0 p-0">
          <Button
            className="m-0"
            style={{ backgroundColor: "#00000000" }}
            onClick={handleAccept}
          >
            Ok!
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default CookieBanner;
