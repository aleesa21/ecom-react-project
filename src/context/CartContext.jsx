import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(()=>{
    const stored= localStorage.getItem("cart")
    return stored ? JSON.parse(stored):[]
  }
  );
   let count = 0;
  cart.forEach((item) => {
    count = count + item.quantity;
  });
  function addToCart(item) {
    const incart = cart.find((cart_item) => cart_item.id === item.id);
    if (incart) { 
      setCart(
        cart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : { ...prod },
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }
  function reduceQnty(item) {
    if (item.quantity === 1) {
      setCart(cart.filter((prod) => prod.id !== item.id));
    } else {
      setCart(
        cart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity - 1 }
            : { ...prod },
        ),
      );
    }
  }

  function increaseQnty(item) {
    setCart(
      cart.map((prod) =>
        prod.id === item.id
          ? { ...prod, quantity: prod.quantity + 1 }
          : { ...prod },
      ),
    );
  }

  function removeItem(item) {
    setCart(cart.filter((prod) => prod.id !== item.id));
  }
  function clearCart() {
    setCart([]);
  }

  useEffect(()=>{
   localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  return (
    <CartContext.Provider
      value={{ cart, addToCart, reduceQnty, increaseQnty, removeItem,clearCart,count }}
    >
      {children}
    </CartContext.Provider>
  );
}
