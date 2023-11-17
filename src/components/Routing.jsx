import { Button, Card, CardContent, Typography } from "@mui/material";
import { Nav, Navbar } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";
import { Tick } from "./Tick";
import logo from "../assets/logo-9.png";
import { BiLogOutCircle } from "react-icons/bi";

function Routing() {
  const nav = useNavigate();
  const handleBack = () => {
    nav("/product");
  };
  return (
    <div>
      <>
        <Navbar sticky="top" bg="primary" variant="dark">
          <Navbar.Brand className="mx-5">
            <img src={logo} width="30" height="30" alt="logo" />
            ShopNow
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link>
              <BsCart3 size={25} className="Bscart" />
            </Nav.Link>
            <Nav.Link className="me-5">
              <BiLogOutCircle size={28} />
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
      <Card
        sx={{ ml: 65, mt: 25, backgroundColor: "#fbfdfd" }}
        style={{
          width: "450px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent>
          <div style={{ display:"flex", justifyContent:"center", alignItems: "center" }}>
            <Tick size={50} />
          </div>
          <Typography variant="h5" className="text">
            Thank You
          </Typography>
          <Typography variant="h5" className="text">
            Your Product as Successfully Ordered
          </Typography>
          <Button variant="outlined" onClick={handleBack}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Routing;
