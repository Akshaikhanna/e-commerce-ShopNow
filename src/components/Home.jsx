import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.webp";
import img5 from "../assets/img5.webp";
import logo from "../assets/logo-9.png";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../styles/Home.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  CardActions,
  Button,
} from "@mui/material";
import { Nav, Navbar } from "react-bootstrap";
import Footer from "../Footer/Footer";

function Home() {
  const [product, setProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  });

  const handlePurchase = () => {
    if (isLoggedIn) {
      setIsLoggedIn("Product purchased!");
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <div>
      <>
        <Navbar sticky="top" bg="primary" data-bs-theme="dark">
          <Navbar.Brand className="mx-5">
            <img src={logo} width="30" height="30" alt="logo" />
            ShopNow
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/about">AboutUs</Nav.Link>
            <Nav.Link className="mx-5" href="/signup">
              Login
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
      <>
        <Swiper
          spaceBetween={30}
          navigation={false}
          centeredSlides={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Navigation, Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={img1} alt="Product" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} alt="Product" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} alt="product" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img4} alt="product" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img5} alt="product" />
          </SwiperSlide>
        </Swiper>
      </>
      <div className="product-container">
        <Container fluid maxWidth="xl">
          <Grid container spacing={3}>
            {product?.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  style={{
                    height: "95%",
                    marginTop: "10%",
                    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="auto"
                    image={item.image}
                    style={{
                      width: "100%",
                      height: "20vh",
                      objectFit: "contain",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography variant="body2">
                      {item.title.substring(0, 12)}...
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ marginLeft: "2%" }}>
                      <Typography>Price: ₹{item.price}</Typography>
                    </div>
                    <div>
                      <Button variant="contained" onClick={handlePurchase}>
                        Purchase
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <div style={{ marginTop: "1%" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
