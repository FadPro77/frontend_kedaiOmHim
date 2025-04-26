import {
  Button,
  Container,
  Carousel,
  Row,
  Col,
  ListGroup,
  Card,
  Accordion,
} from "react-bootstrap";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import SelamatDatang from "../../assets/img/Frame-327.png";
import ownerImg from "../../assets/img/image-30.png";
import dummyMakanan from "../../assets/img/dummy-makanan.png";
import { getMenu } from "../../service/menu";
import { Link } from "@tanstack/react-router";

const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ScreenHomepage = () => {
  const [makanan, setMakanan] = useState([]);
  const [minuman, setMinuman] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const makananData = await getMenu(null, null, "makanan");
        const minumanData = await getMenu(null, null, "minuman");

        const randomMakanan = getRandomItems(makananData, 4);
        const randomMinuman = getRandomItems(minumanData, 4);

        setMakanan(randomMakanan);
        setMinuman(randomMinuman);
      } catch (error) {
        console.error("Gagal fetch menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const renderMenuItems = (items) =>
    items.map((item, index) => (
      <Col key={index} md={3} sm={6} className="mb-4">
        <Card style={{ borderRadius: "15px", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={item.image || dummyMakanan}
            style={{ width: "20rem", height: "20rem" }}
          />
          <Card.Body>
            <Card.Title
              className="text-start fw-bold"
              style={{ fontFamily: "'Montserrat'" }}
            >
              {item.nama}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ));

  return (
    <>
      <section id="welcome">
        <Container
          style={{
            borderBottom: "3px solid white",
            width: "90%",
            height: "100vh",
          }}
        >
          <img
            src={SelamatDatang}
            style={{ marginTop: "16rem", height: "23rem" }}
          />
        </Container>
      </section>

      <section id="about" style={{ position: "relative", overflow: "hidden" }}>
        {/* Background layer */}
        <div
          style={{
            backgroundColor: "#1A2129",
            opacity: "0.9",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        ></div>

        {/* Konten utama */}
        <Container
          style={{
            borderBottom: "3px solid white",
            width: "90%",
            margin: "auto",

            paddingTop: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link to="/about" style={{ textDecoration: "none" }}>
            <h2
              className="text-white text-center mb-5"
              style={{
                fontFamily: "'Caveat'",
                fontSize: "75px",
                cursor: "pointer",
              }}
            >
              Tentang Kami
            </h2>
          </Link>
          <Row className="align-items-center mb-5">
            <Col md={8}>
              <p
                className="text-white"
                style={{
                  fontFamily: "'Inter'",
                  width: "40vw",
                  textAlign: "justify",
                  fontSize: "20px",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </Col>
            <Col md={4} className="text-center text-white">
              <img
                src={ownerImg}
                alt="owner-img"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginBottom: "1rem",
                }}
              />
              <div
                className="text-start"
                style={{ fontFamily: "'Montserrat'", fontSize: "20px" }}
              >
                <strong>Owner</strong>
                <br />
                Sinawang Langit Bagaskara
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="menu" style={{ position: "relative", overflow: "hidden" }}>
        {/* Background layer */}
        <div
          style={{
            backgroundColor: "#1A2129",

            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        ></div>

        {/* Konten utama */}
        <Container
          style={{
            borderBottom: "3px solid white",
            width: "90%",
            margin: "auto",

            paddingTop: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <h2
              className="text-white text-center mb-5"
              style={{ fontFamily: "'caveat'", fontSize: "75px" }}
            >
              Menu
            </h2>
          </Link>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3
              className="text-white fs-2"
              style={{ fontFamily: "'Source Serif 4'" }}
            >
              <u>Makanan</u>
            </h3>
            <Button href="/menu" variant="danger" className="fs-5">
              Lainnya
            </Button>
          </div>
          <Row className="mb-5">{renderMenuItems(makanan)}</Row>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3
              className="text-white fs-2"
              style={{ fontFamily: "'Source Serif 4'" }}
            >
              <u>Minuman</u>
            </h3>
            <Button href="/menu" variant="danger" className="fs-5">
              Lainnya
            </Button>
          </div>

          <Row className="mb-5">{renderMenuItems(minuman)}</Row>
        </Container>
      </section>

      {/* Tambahkan section lain seperti menu, kontak, dll */}
    </>
  );
};

export default ScreenHomepage;
