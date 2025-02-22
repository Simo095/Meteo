import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ricerca from "./components/Ricerca";
import { Container } from "react-bootstrap";
import FetchMeteo from "./components/FetchMeteo";

function App() {
  return (
    <>
      <div
        className="App d-flex gradient-background overflow-y-scroll"
        style={{ height: "100vh" }}
      >
        <BrowserRouter>
          <Container className="text-center d-flex flex-column">
            <Header></Header>
            <Routes>
              <Route path="/Meteo" element={<Ricerca />}></Route>
              <Route
                path="/Meteo/dettagli-meteo"
                element={<FetchMeteo />}
              ></Route>
            </Routes>

            <Footer></Footer>
          </Container>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
