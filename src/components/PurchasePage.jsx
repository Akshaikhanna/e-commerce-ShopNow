import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import PurchaseForm from "./PurchaseForm";
import "../styles/Product.css"

function PurchasePage() {
  const [orderItem, setOrderItem] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("Order");
    if (savedCart) {
      setOrderItem(JSON.parse(savedCart));
    }
  }, []);

  const handleOrder = () => {
    nav("/product");
  };

  const handleClick = () => {
    nav("/product");
  };

  return (
    <div className="orderpage">
      <Navbar sticky="top" bg="primary" variant="dark">
        <Navbar.Brand className="mx-5" >ShopNow</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link onClick={handleClick}>
            <MdOutlineArrowBack />
            Back
          </Nav.Link>
        </Nav>
      </Navbar>
  
      <Grid container spacing={2}>
        {orderItem && orderItem.length > 0 ? (
          orderItem.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card style={{ width: "90%", height: "60%" }}>
                <CardContent style={{ padding: "20px", height: "100%" }}>
                  <div style={{ height: "60%" }}>
                    <img
                      src={item.image}
                      alt="img"
                      className="Ordered-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div style={{ height: "40%" }}>
                    <Typography variant="body1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="h6">Price: ${item.price}</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card sx={{ width: "300px", height: "100%", mt: 5, position:"relative", alignItems:"  "}}  className="ordercard">
              <CardContent style={{ height: "100%" }}>
                <Typography>
                  <br />
                  <h3 className="yourorder">You have no Orders</h3>
                  <Button onClick={handleOrder}>Start Shopping</Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <PurchaseForm/>
    </div>
  );
}

export default PurchasePage;
