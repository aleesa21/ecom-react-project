import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import EmptyCart from "./EmptyCart";
import"../css/cart.css"

export default function Cart() {
  let { cart } = useContext(CartContext);
  const isempty = cart.length === 0;

  return (
    <section className="cartpage padding ">
      {isempty ? <EmptyCart />
      : <div className="cart">
        {
            cart.map((item)=>{
                return(
                    <>
                    <div>{item.title}</div>
                    <div>{item.quantity}</div>
                    <br></br>
                    </>
                )
            })
      }
      </div>}
    </section>
  );
}
