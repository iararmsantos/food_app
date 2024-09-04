import React from "react";
import Header from "../Header";
import Meals from "../Meals";
import { CartContextProvider } from "../../store/CartContext";
import { UserProgressContextProvider } from "../../store/UserProgressContext";
import Cart from "../Cart";
import Checkout from "../Checkout";

const Main = () => {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
};

export default Main;
