import React from "react";
import {
  Col,
  Container,
  Row,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaGithub, FaHome } from "react-icons/fa";
import { MdEmail, MdPhone, MdWhatsapp } from "react-icons/md";
import logo from "../asset/img/logoFoot.png";
import { Link } from "react-router-dom";

const Footer = ({ descrizione }) => {
  const vcfData = `BEGIN:VCARD\nVERSION:3.0\nFN:Sdc Web-Developer\nEMAIL:sdcweb@gmail.com\nTEL:+393337179769\nURL:https://wa.me/393337179769\nEND:VCARD`;
  const vcfBlob = new Blob([vcfData], { type: "text/vcard" });
  const vcfUrl = URL.createObjectURL(vcfBlob);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        color: descrizione.includes("rain") ? "white" : "rgba(0, 0, 0, 0.6)",

        position: "relative",
        bottom: 0,
        borderRadius: 30,
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Row className="d-flex justify-content-between align-items-center">
        <Col xs={12} md={3} className="d-flex justify-content-center">
          <Image
            src={logo}
            style={{
              width: "150px",
            }}
          />
        </Col>
        <Col
          xs={12}
          md={3}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <p>
            <MdEmail
              size={24}
              className="me-2"
              color={
                descrizione.includes("rain") ? "white" : "rgba(0, 0, 0, 0.6)"
              }
            />
            <a
              href="mailto:sdcweb@gmail.com"
              style={{
                color: descrizione.includes("rain")
                  ? "white"
                  : "rgba(0, 0, 0, 0.6)",
                textDecoration: "none",
              }}
            >
              sdcweb@gmail.com
            </a>
          </p>
          <p>
            <MdPhone
              size={24}
              className="me-2"
              color={
                descrizione.includes("rain") ? "white" : "rgba(0, 0, 0, 0.6)"
              }
            />{" "}
            +39 333 71 79 769
          </p>
          <p>
            <MdWhatsapp
              size={24}
              className="me-2"
              color={
                descrizione.includes("rain") ? "white" : "rgba(0, 0, 0, 0.6)"
              }
            />
            <a
              href="https://wa.me/393337179769"
              style={{
                color: descrizione.includes("rain")
                  ? "white"
                  : "rgba(0, 0, 0, 0.6)",
              }}
            >
              Chatta su WhatsApp
            </a>
          </p>
        </Col>
        <Col
          xs={12}
          md={2}
          className="d-flex flex-column justify-content-center align-items-center gap-2 gap-md-0 flex-md-row"
        >
          <a
            href="https://github.com/simo095"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex gap-3 align-items-center"
            style={{
              color: descrizione.includes("rain")
                ? "white"
                : "rgba(0, 0, 0, 0.6)",
              fontSize: "24px",
              marginRight: "15px",
              textDecoration: "unset",
            }}
          >
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip className="d-none d-md-block" id="button-tooltip">
                  Visiona il mio profilo Git Hub con alcuni lavori.
                </Tooltip>
              }
            >
              <FaGithub />
            </OverlayTrigger>
            <p style={{ fontSize: "0.6em" }} className="d-md-none">
              Visiona il mio profilo Git Hub con alcuni lavori.
            </p>
          </a>
          <a
            href={vcfUrl}
            download="Simone Programmatore.vcf"
            className="d-flex gap-3 align-items-center"
            style={{
              color: descrizione.includes("rain")
                ? "white"
                : "rgba(0, 0, 0, 0.6)",
              fontSize: "24px",
              textDecoration: "unset",
            }}
          >
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip className="d-none d-sm-block" id="button-tooltip">
                  Scarica la mia scheda da aggiungere in rubrica!
                </Tooltip>
              }
            >
              <MdOutlineConnectWithoutContact />
            </OverlayTrigger>
            <p style={{ fontSize: "0.6em" }} className="d-md-none">
              Scarica la mia scheda da aggiungere in rubrica!
            </p>
          </a>
        </Col>
        <Col
          xs={12}
          md={2}
          className="d-flex justify-content-center align-items-center"
        >
          <Link to="/Meteo/">
            <FaHome
              size={30}
              color={
                descrizione.includes("rain") ? "white" : "rgba(0, 0, 0, 0.6)"
              }
            />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
