import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function OrderSummary() {
  const [product, setProduct] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState();

  useEffect(() => {
    const productData = localStorage.getItem("Order");
    if (productData) {
      setProduct(JSON.parse(productData));
    }
    const randomDays = Math.floor(Math.random() * 10);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + randomDays);
    setDeliveryDate(currentDate);
  }, []);

  const handleQuantityChange = (index, increment) => {
    const updatedProduct = [...product];
    updatedProduct[index].quantity =
      (updatedProduct[index].quantity || 1) + increment;
    if (updatedProduct[index].quantity < 1) {
      updatedProduct[index].quantity = 1;
    }
    setProduct(updatedProduct);
  };

  const calculateTotalPrice = (item) => {
    return (item.price * (item.quantity || 1)).toFixed(2);
  };

  return (
    <div>
      {product.map((item, index) => (
        <Card
          key={index}
          style={{
            height: "490px",
            margin: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                alt={item.title}
                height="40%"
                image={item.image}
                style={{ objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <br />
                <Typography variant="body1">
                  Category: {item.category}
                </Typography>
                <br />
                <Typography variant="body1">Price: ₹{item.price}</Typography>
                <br />
                <Typography variant="h6">
                  Total Price: ₹{calculateTotalPrice(item)}
                </Typography>
                <br />
                <div>
                  <Fab
                    size="small"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    <RemoveIcon />
                  </Fab>
                  <Typography
                    variant="h6"
                    style={{ display: "inline", margin: "0 8px" }}
                  >
                    {item.quantity || 1}
                  </Typography>
                  <Fab
                    size="small"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    <AddIcon />
                  </Fab>
                </div>
                <br />
                <Typography>
                  Delivery by:
                  {deliveryDate ? deliveryDate.toDateString() : "N/A"}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
}

export default OrderSummary;
