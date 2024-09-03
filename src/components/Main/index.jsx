import React from "react";
import Header from "../Header";
import Meals from "../Meals";
import { CartContextProvider } from "../../store/CartContext";
import { UserProgressContextProvider } from "../../store/UserProgressContext";
import Cart from "../Cart";

const Main = () => {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
};

export default Main;
