import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import EmptyCart from "./EmptyCart";
import"../css/cart.css"
import MainCart from "./MainCart";

export default function Cart() {
  let { cart } = useContext(CartContext);
  const isempty = cart.length === 0;

  return (
    <section className="cartpage padding ">
      {isempty ? <EmptyCart />
      : <MainCart /> }
    </section>
  );
}
