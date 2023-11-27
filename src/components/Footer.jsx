import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container
      className="mt-5 pt-4"
      style={{ color: "rgba(0, 0, 0, 0.6)", background: "rgba(0,0,0,0.2)", borderRadius: 30 }}>
      <Row>
        <Col>
          <p>&copy; 2023 EpicMeteo</p>
        </Col>
        <Col>
          <Link to="/">
            <Button className="btn-gen">Back to search</Button>
          </Link>
        </Col>
        <Col>
          <p>Privacy</p>
          <p>I dont'know what write</p>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;
