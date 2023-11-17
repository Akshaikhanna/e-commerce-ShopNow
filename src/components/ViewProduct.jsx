import {
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import logo from "../assets/logo-9.png";

function ViewProduct() {
  const [orderItem, setOrderItem] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("Order");
    if (savedCart) {
      setOrderItem(JSON.parse(savedCart));
    }
  }, []);

  const handleClick = () => {
    nav("/purchaseform");
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product">All Products</Nav.Link>
            <Nav.Link href="/cartpage">
              <BsCart3 size={20} className="Bscart" />
              {/* <span>{cartCount}</span> */}
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.2)",
            transition: "1s",
          }}
        >
          {orderItem.map((item) => (
            <Grid container key={item.id}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="300"
                  image={item.image}
                  style={{
                    width: "100%",
                    height: "90%",
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography variant="h5" marginTop="3%">
                    {item.title}
                  </Typography>
                  <Typography marginTop="3%">{item.description}</Typography>
                  <br />
                  <Rating value={item.rating.rate} marginTop="3%" />
                  <Typography variant="h6" marginTop="3%">
                    Price: ₹{item.price}
                  </Typography>
                </CardContent>
                <CardActions marginTop="3%">
                  <Button onClick={handleClick}>Purchase</Button>
                </CardActions>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ViewProduct;
