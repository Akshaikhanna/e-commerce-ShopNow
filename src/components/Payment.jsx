import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  CardMedia,
  TextField,
  Button,
} from "@mui/material";
import gif from "../assets/UPI.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentMethodType, setPaymentMethodType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardValidity, setCardValidity] = useState("");
  const [cvv, setCVV] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");

  const generateRandomCaptcha = () => {
    const randomCaptcha = Math.floor(Math.random() * 10000);
    setCaptcha(randomCaptcha.toString());
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePaymentMethodTypeChange = (event) => {
    setPaymentMethodType(event.target.value);
    if (event.target.value === "cash") {
      generateRandomCaptcha();
    }
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const cardNumberInput = event.target.value.replace(/\D/g, "");
    setCardNumber(cardNumberInput);
  };

  const handleCardValidityChange = (event) => {
    setCardValidity(event.target.value);
  };

  const handleCVVChange = (event) => {
    const cvvInput = event.target.value.replace(/\D/g, "");
    if (cvvInput.length <= 3) {
      setCVV(cvvInput);
    }
  };

  const validateCardNumber = (cardNumber) => {
    return /^\d{16}$/.test(cardNumber);
  };

  const validateCardValidity = (cardValidity) => {
    return /^\d{4}$/.test(cardValidity);
  };

  const validateCVV = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  const handleSendOTP = () => {
    console.log(`Sending OTP to ${phoneNumber}`);
  };

  const handlePay = () => {
    if (
      validateCardNumber(cardNumber) &&
      validateCardValidity(cardValidity) &&
      validateCVV(cvv)
    ) {
      toast.error("Please try again", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        theme: "dark",
      });
    } else {
      console.log("Please try again");
      toast.success("Successful", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (inputCaptcha === captcha) {
      toast.success("Order confirmed!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        theme: "dark",
      });
    } else {
      toast.error("Invalid captcha. Please try again", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <ToastContainer />

      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethodType}
              onChange={handlePaymentMethodTypeChange}
            >
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label={
                  <div>
                    <CardMedia
                      component="img"
                      alt="Payment GIF"
                      image={gif}
                      style={{ width: "25%" }}
                    />
                    <div style={{ marginLeft: "30px", marginTop: "-25%" }}>
                      UPI
                    </div>
                  </div>
                }
              />
              {paymentMethodType === "upi" && (
                <div>
                  <Select
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="phonepe">PhonePe</MenuItem>
                    <MenuItem value="your-upi-id">Your UPI ID</MenuItem>
                  </Select>
                  {selectedPaymentMethod === "phonepe" && (
                    <div>
                      <TextField
                        label="Enter Phone Number"
                        value={phoneNumber}
                        inputProps={{ maxLength: 10 }}
                        onChange={handlePhoneNumberChange}
                      />
                      <Button variant="contained" onClick={handleSendOTP}>
                        Send OTP
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit/ATM Card"
              />
              {paymentMethodType === "card" && (
                <div>
                  <TextField
                    label="Card Number"
                    value={cardNumber}
                    inputProps={{ maxLength: 16 }}
                    onChange={handleCardNumberChange}
                  />
                  <TextField
                    label="Validity (MM/YY)"
                    value={cardValidity}
                    inputProps={{ maxLength: 5 }}
                    onChange={handleCardValidityChange}
                    style={{ marginLeft: "2%" }}
                  />
                  <TextField
                    label="CVV"
                    inputProps={{ maxLength: 3 }}
                    value={cvv}
                    onChange={handleCVVChange}
                    style={{ marginTop: "2%" }}
                  />
                  <Button
                    variant="contained"
                    onClick={handlePay}
                    style={{ marginTop: "3%", marginLeft: "2%" }}
                  >
                    Pay
                  </Button>
                </div>
              )}
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
            {paymentMethodType === "cash" && (
              <div>
                <div>
                  <h5> {captcha}</h5>
                  <TextField
                    label="Enter Captcha"
                    value={inputCaptcha}
                    onChange={(e) => setInputCaptcha(e.target.value)}
                  />
                </div>
                <Button
                  variant="contained"
                  style={{ marginTop: "2%" }}
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </Button>
              </div>
            )}
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}

export default Payment;
