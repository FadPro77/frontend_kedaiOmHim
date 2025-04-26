import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { getMenu } from "../../service/menu";

const ScreenMenu = () => {
  const [makanan, setMakanan] = useState([]);
  const [minuman, setMinuman] = useState([]);
  const [filter, setFilter] = useState("semua"); // semua | makanan | minuman

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const makananData = await getMenu(null, null, "makanan");
        const minumanData = await getMenu(null, null, "minuman");

        setMakanan(makananData || []);
        setMinuman(minumanData || []);
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
            src={item.image || "/path/to/default-image.jpg"}
            style={{ width: "20rem", height: "20rem", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title
              className="text-start fw-bold"
              style={{ fontFamily: "'Montserrat'" }}
            >
              {item.nama}
            </Card.Title>
            <Card.Text className="text-start">
              Rp {item.harga?.toLocaleString("id-ID")}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredItems = () => {
    if (filter === "makanan") return makanan;
    if (filter === "minuman") return minuman;
    return [...makanan, ...minuman]; // semua
  };

  return (
    <>
      <section id="menu-2" style={{ position: "relative", overflow: "hidden" }}>
        <Container
          style={{
            width: "90%",
            margin: "auto",
            paddingTop: "12rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            className="text-white text-center mb-3"
            style={{ fontFamily: "'Caveat'", fontSize: "75px" }}
          >
            Menu
          </h2>

          {/* Tombol Filter */}
          <div className="d-flex justify-content-center mb-5 gap-3">
            <Button
              variant={filter === "semua" ? "danger" : "outline-light"}
              onClick={() => handleFilterChange("semua")}
            >
              Semua
            </Button>
            <Button
              variant={filter === "makanan" ? "danger" : "outline-light"}
              onClick={() => handleFilterChange("makanan")}
            >
              Makanan
            </Button>
            <Button
              variant={filter === "minuman" ? "danger" : "outline-light"}
              onClick={() => handleFilterChange("minuman")}
            >
              Minuman
            </Button>
          </div>

          {/* Card Menu */}
          <Row className="mb-5">{renderMenuItems(getFilteredItems())}</Row>
        </Container>
      </section>
    </>
  );
};

export default ScreenMenu;
