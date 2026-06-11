import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import "../css/Product.css"
import { CartContext } from "../context/CartContext";

export default function Products() {
  let {product}=useContext(ProductContext);
  let {cart,addToCart}=useContext(CartContext);

  
  function checkincart(prod){
 return cart.find((cartitem)=>cartitem.id===prod.id)
  }
  return (
    <div className="product-page padding">
    <div className="productpage-top-sec">
       <div className="pp-top-sec-text">
         <div className="golden our-collection-text">- Our Collection</div>
         <div  className="all-prod-text">All <span>Products</span></div>
       </div>
       <div className="product-filter-list">
              <div className="p-filter-list">✦ All</div>
              <div className="p-filter-list">Men's clothing</div>
              <div className="p-filter-list">Jwellery</div>
              <div className="p-filter-list">Electronics</div>
              <div className="p-filter-list">Women's Clothing</div>
            </div>
    </div>
      <div className="poducts-container">
        {product.map((item)=>{
            return  <div className="product" key={item.id}>
          <div className="product-top">
            <div>
              <img 
                className="prod-img-home"
                src={item.image}
                alt={item.title}
              ></img>
            </div>
          </div>
          <div className="product-bottom">
            <div className="prod-category">{item.category}</div>
            <div className="prod-title">
              {item.title}
            </div>
            <div className="prod-rating">{item.rating.rate}({item.rating.count})</div>
            <div className="prod-price-plus">
              <div className="prod-price">${item.price}</div>
              <button 
              style={{background: checkincart(item)?"green":"#b8860b"}}
              onClick={()=>{
                addToCart(item)
              }}className="prod-plusbtn">{checkincart(item)?"✓" : "+"}</button>
            </div>
          </div>
        </div>
                   
                   
        })}
        
      </div>
    </div>
  );
}
