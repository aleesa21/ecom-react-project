import {  createContext, useState } from "react";

export const CartContext=createContext();

export default function CartProvider({children}){
const [cart,setCart]=useState([]);
function addToCart(item){
  const incart=cart.find(cart_item=>cart_item.id===item.id)
  if(incart){
    setCart(cart.map((prod)=>prod.id===item.id
    ?{...prod,quantity:prod.quantity+1}
    :{...prod})
  )
   
  }
  else{
setCart([...cart,{...item,quantity:1}])
  }
  
  console.log(cart);
}

  return (
    <CartContext.Provider value={{cart,addToCart}}>
      {children}
    </CartContext.Provider>
  )
}