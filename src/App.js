import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Product from "./components/Product";
import About from "./components/About";
import PageError from "./Error/PageError";
import CartPage from "./components/CartPage";
import PurchaseForm from "./components/PurchaseForm";
import ViewProduct from "./components/ViewProduct";
import OrderSummary from "./components/OrderSummary";
import Payment from "./components/Payment";
import Routing from "./components/Routing";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageError />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/view" element={<ViewProduct />} />
        <Route path="/purchaseform" element={<PurchaseForm />} />
        <Route path="/ordered" element={<OrderSummary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/routing" element={<Routing />} />
      </Routes>
    </>
  );
}

export default App;
