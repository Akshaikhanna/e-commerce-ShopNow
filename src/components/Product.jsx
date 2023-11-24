import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Tooltip,
} from "@mui/material";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../action/CartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import { getAuth, signOut } from "firebase/auth";
import { BiLogOutCircle } from "react-icons/bi";
import "../styles/Product.css";
import Footer from "../Footer/Footer";
import logo from "../assets/logo-9.png";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const nav = useNavigate();
  const apiUrl = "https://fakestoreapi.com/products";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) => {
        const titleMatch = product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const categoryMatch =
          selectedCategory === "All" ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();
        return titleMatch && categoryMatch;
      },
      [searchQuery, selectedCategory, products]
    );

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const handleClick = () => {
    nav("/cartpage");
  };

  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(addToCartAction(product));
    toast.success("Successfully Added to cart", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      theme: "dark",
    });
    setCartCount(cartCount + 1);
  };

  const handlePurchase = (product) => {
    const updatedCart = [...orderItem, product];
    setOrderItem([...orderItem, product]);
    localStorage.setItem("Order", JSON.stringify(updatedCart));
    nav("/view");
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
      localStorage.removeItem("User")
      nav("/")
  };

  return (
    <div>
      <ToastContainer />
      <>
        <Navbar sticky="top" bg="primary" variant="dark">
          <Navbar.Brand className="mx-5">
            <img src={logo} width="30" height="30" alt="logo" />
            ShopNow
          </Navbar.Brand>
          <Button
            className={`category-button ${
              selectedCategory === "All" && "active"
            }`}
            onClick={() => handleCategoryChange("All")}
            style={{ marginRight: "10px", color: "white" }}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              className={`category-button ${
                selectedCategory === category && "active"
              }`}
              onClick={() => handleCategoryChange(category)}
              style={{ marginRight: "10px", color: "white" }}
            >
              {category}
            </Button>
          ))}
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link>
              <BsCart3 size={20} onClick={handleClick} className="Bscart" />
              <span>{cartCount}</span>
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="me-5">
              <BiLogOutCircle size={28} />
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
      <Container maxWidth="xl" style={{ height: "100%", overflowY: "auto" }}>
        <Grid container spacing={3} style={{ height: "100%", color: "white" }}>
          <Grid item xs={12}>
            <div className="category-buttons"></div>
          </Grid>
          {filteredProducts?.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                className="product-card"
                style={{
                  height: "99%",
                  boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Zoom>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="125"
                    image={product.image}
                    style={{ objectFit: "contain" }}
                    className="product-card-media"
                  />
                </Zoom>
                <CardContent style={{ flex: "1" }}>
                  <Typography
                    variant="body2"
                    component="div"
                    className="product-card-title"
                    style={{ minHeight: "40px" }}
                  >
                    <Tooltip title={product.title}>
                      <b>{product.title.substring(0, 15)}...</b>
                    </Tooltip>
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Typography variant="h6" className="product-card-price">
                      Price: ₹{product.price.toFixed(2)}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    variant="warning"
                    onClick={() => addToCart(product)}
                    className="addtocart"
                  >
                    Add to cart
                  </Button>
                  <Button
                    onClick={() => handlePurchase(product)}
                    className="purchase"
                  >
                    View product
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Product;
