import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { CardActions, Button, Rating } from "@mui/material";
import { Nav, FormControl, Form, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  incrementItemQuantity,
  decrementItemQuantity,
} from "../action/CartAction";
import cart from "../assets/Cart.png";
import logo from "../assets/logo-9.png";

function CartPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const nav = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // const calculateTotalQuantity = () => {
  //   return cartItems.reduce((total, item) => {
  //     const quantity = parseInt(item.quantity) || 0;
  //     return total + quantity;
  //   }, 0);
  // };

  // const calculateTotalPrice = () => {
  //   return cartItems.reduce((total, item) => {
  //     const quantity = parseInt(item.quantity) || 0;
  //     const price = parseFloat(item.price) || 0;
  //     return total + quantity * price;
  //   }, 0);
  // };

  const handlePurchase = () => {
    localStorage.setItem("Cart", JSON.stringify());
    nav("/purchaseform");
  };

  const handleIncrementQuantity = (itemId) => {
    dispatch(incrementItemQuantity(itemId));
  };

  const handleDecrementQuantity = (itemId) => {
    dispatch(decrementItemQuantity(itemId));
  };

  const handleCart = () => {
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
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
          </Nav>
        </Navbar>
      </>
      <Container maxWidth="md">
        {cartItems.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "40%",
              paddingTop: "12%",
            }}
          >
            <Container>
              <CardMedia
                image={cart}
                alt="img"
                component="img"
                style={{ width: "120px", marginTop: "20%" }}
              />
              <Typography variant="body1">Your cart is empty.</Typography>
              <Button variant="contained" onClick={handleCart}>
                Shop Now
              </Button>
            </Container>
          </div>
        ) : (
          <Container>
            <Grid>
              {cartItems.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Card
                    className="product-card"
                    style={{
                      width: "100%",
                      display: "flex",
                      margin: "16px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={item.title}
                      image={item.image}
                      style={{
                        objectFit: "contain",
                        width: "50%",
                        height: "50%",
                      }}
                    />
                    <div style={{ flex: 1, paddingLeft: "1rem" }}>
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          {item.title}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography>{item.description}</Typography>
                      </CardContent>
                      <CardContent>
                        <Rating value={item.rating.rate} />
                      </CardContent>
                      <CardContent>
                        <Typography variant="body1" color="textSecondary">
                          Price: ₹{item.price}
                        </Typography>
                      </CardContent>
                      {typeof item.quantity === "number" && (
                        <CardContent>
                          <Typography variant="body2" color="textSecondary">
                            Total: ₹{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </CardContent>
                      )}
                      <CardActions>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDecrementQuantity(item.id)}
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleIncrementQuantity(item.id)}
                        >
                          +
                        </Button>
                      </CardActions>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={handlePurchase}
                        >
                          Purchase
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* <Typography variant="body1" color="textSecondary">
              Total Quantity: {calculateTotalQuantity()}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Total Price: ₹{calculateTotalPrice().toFixed(2)}
            </Typography> */}
          </Container>
        )}
      </Container>
    </div>
  );
}

export default CartPage;
