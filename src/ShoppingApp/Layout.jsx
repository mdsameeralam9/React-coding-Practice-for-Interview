import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import "./style.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./reduxStore/store";

const Header = () => {
  const cartCount = useSelector((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="header">
      <Link to="/">
        <h1>Shooping App</h1>
      </Link>

      <Link to="/cart" className="cart-link">
        <h1>Cart</h1>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </div>
  );
};

const LayoutShopping = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default LayoutShopping;
