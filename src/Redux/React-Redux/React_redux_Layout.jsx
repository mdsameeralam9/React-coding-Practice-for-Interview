import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import ProductsList from "./ProductsList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./Product";
import Login from "./Login";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import WithAuth from "./WithAuth";
import ErrorBoundry from "./ErrorBoundry";
const ProtectedAbout = WithAuth(About);

const ProductProtected = ({ children }) => {
  const isUser = localStorage.getItem("isLoggedIn");

  return isUser ? children : <Navigate to="/login" />;
};

const React_redux_Layout = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <ErrorBoundry>
          <Routes>
            <Route
              index
              path="/"
              element={
                <ProductProtected>
                  <ProductsList />{" "}
                </ProductProtected>
              }
            />
            {/* <Route index element={<ProductsList />}/> */}
            <Route exact path="/:id" element={<Product />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/about" element={<ProtectedAbout />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route path="*" element={<h1>You are on wrong URL!</h1>} />
          </Routes>
        </ErrorBoundry>
      </BrowserRouter>
    </Provider>
  );
};

export default React_redux_Layout;
