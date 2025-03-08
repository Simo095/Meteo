import { Container, Navbar } from "react-bootstrap";
import { getWeatherTranslation } from "../asset/js";

const Header = ({ nome, descrizione }) => {
  return (
    <Navbar className="flex-column justify-content-evenly">
      <Container>
        <Navbar.Brand>Meteo in {nome}</Navbar.Brand>
        <Navbar.Brand>{getWeatherTranslation(descrizione)}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
