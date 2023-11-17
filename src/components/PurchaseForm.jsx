import React, { useState, useEffect } from "react";
import "../styles/Product.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Nav, Navbar } from "react-bootstrap";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-9.png";

const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });
  const [orderItem, setOrderItem] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const steps = ["Delivery Details", "Order Summary", "Payment Option"];
  const [activeStep, setActiveStep] = useState(0);
  // const [isFormComplete, setFormComplete] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("Order");
    if (savedCart) {
      setOrderItem(JSON.parse(savedCart));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handledformsubmit = () => {
    toast.success("Your product have successfully ordered", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      theme: "dark",
    });
    nav("/routing");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.streetAddress) {
      errors.streetAddress = "Street Address is required";
    }
    if (!formData.country) {
      errors.country = "Country is required";
    }
    if (!formData.city) {
      errors.city = "City is required";
    }
    if (!formData.state) {
      errors.state = "State is required";
    }
    if (!formData.pinCode) {
      errors.pinCode = "PIN Code is required";
    }
    if (!formData.phone) {
      errors.phone = "Phone is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setSubmitted(false);
      }
    }
  };

  return (
    <div>
      <>
        <Navbar sticky="top" bg="primary" variant="dark">
          <Navbar.Brand className="mx-5">
            <img src={logo} width="30" height="30" alt="logo" />
            ShopNow
          </Navbar.Brand>
          <Nav className="ms-auto"></Nav>
        </Navbar>
      </>
      <ToastContainer />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {submitted ? (
        <OrderSummary />
      ) : (
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card
              variant="outlined"
              style={{
                boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
                width: "100%",
              }}
              sx={{ ml: 5, mt: 5 }}
            >
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    width={600}
                    mx="auto"
                  >
                    <h4 className="details">Delivery Details</h4>
                    <TextField
                      name="name"
                      label="Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      margin="normal"
                      inputProps={{ maxLength: 40 }}
                      fullWidth
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                    />
                    <TextField
                      name="streetAddress"
                      label="Street Address"
                      variant="outlined"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      margin="normal"
                      inputProps={{ maxLength: 500 }}
                      fullWidth
                      error={!!formErrors.streetAddress}
                      helperText={formErrors.streetAddress}
                    />
                    <TextField
                      name="country"
                      label="Country"
                      variant="outlined"
                      value={formData.country}
                      onChange={handleChange}
                      margin="normal"
                      inputProps={{ maxLength: 40 }}
                      fullWidth
                      error={!!formErrors.country}
                      helperText={formErrors.country}
                    />
                    <TextField
                      name="city"
                      label="City"
                      variant="outlined"
                      value={formData.city}
                      onChange={handleChange}
                      margin="normal"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                      error={!!formErrors.city}
                      helperText={formErrors.city}
                    />
                    <TextField
                      name="state"
                      label="State"
                      variant="outlined"
                      value={formData.state}
                      onChange={handleChange}
                      margin="normal"
                      inputProps={{ maxLength: 50 }}
                      fullWidth
                      error={!!formErrors.state}
                      helperText={formErrors.state}
                    />
                    <TextField
                      name="pinCode"
                      label="PIN Code"
                      variant="outlined"
                      value={formData.pinCode}
                      onChange={handleChange}
                      margin="normal"
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      error={!!formErrors.pinCode}
                      helperText={formErrors.pinCode}
                    />
                    <TextField
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      value={formData.phone}
                      onChange={handleChange}
                      margin="normal"
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      error={!!formErrors.phone}
                      helperText={formErrors.phone}
                    />
                    {activeStep === 1 && (
                      <>
                        <OrderSummary />
                      </>
                    )}
                    {activeStep === 2 && (
                      <>
                        <Payment />
                      </>
                    )}
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handledformsubmit}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    )}
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {orderItem.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={item.title}>
              <Card
                style={{
                  width: "30%",
                  height: "auto",
                  boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
                  position:"fixed"
                }}
                sx={{ ml: 10, mt: 3 }}
                className="card"
              >
                <CardContent>
                  <CardContent>
                    <Typography variant="h6">PRICE DETAILS</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>Product: {item.title}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>Price: ${item.price}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>Delivery Charge: FREE</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h5">
                      Total Price: ${item.price}
                    </Typography>
                  </CardContent>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PurchaseForm;
