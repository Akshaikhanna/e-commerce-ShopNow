import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo-9.png";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material";
import { Button, Card, Container, Typography } from "@mui/material";

function About() {
  return (
    <>
      <>
        <Navbar sticky="top" bg="primary" data-bs-theme="dark">
          <Navbar.Brand className="mx-5">
            <img src={logo} width="30" height="30" alt="logo" />
            ShopNow
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link className="mx-5" href="/signup">
              Login
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
      <Container>
        <Card sx={{ mt: 11 }}>
          <div style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
              About ShopNow
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to ShopNow, your one-stop online shopping destination!
            </Typography>
            <Typography variant="body1" paragraph>
              At ShopNow, we are dedicated to providing you with a seamless and
              enjoyable shopping experience. Our mission is to offer a wide
              range of high-quality products at competitive prices, all while
              ensuring exceptional customer service.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're looking for the latest fashion trends, electronic
              gadgets, home decor, or anything in between, ShopNow has you
              covered. Explore our vast selection of products, and discover
              amazing deals and discounts that will make your shopping
              experience even more delightful.
            </Typography>
            <Typography variant="body1" paragraph>
              Our user-friendly website and mobile app make it easy to browse,
              search, and purchase products. We also offer secure payment
              options and fast, reliable shipping to ensure that your orders
              arrive on time.
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for choosing ShopNow for all your shopping needs. If you
              have any questions or need assistance, please don't hesitate to
              contact our customer support team. We look forward to serving you
              and making your shopping journey with us exceptional!
            </Typography>
          </div>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Back to Home
          </Button>
        </Card>
      </Container>
    </>
  );
}

export default About;
