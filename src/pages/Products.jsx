import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "../css/Product.css";
import { CartContext } from "../context/CartContext";
import { useState } from "react";

export default function Products() {
  let { product } = useContext(ProductContext);
  let { cart, addToCart } = useContext(CartContext);
  const [filter, setFilter] = useState("all");
  const categories = ["all", ...new Set(product.map((p) => p.category))];
  const filtered =
    filter.toLowerCase() === "all"
      ? product
      : product.filter((p) => p.category.toLowerCase() === filter.toLowerCase());
  function checkincart(prod) {
    return cart.find((cartitem) => cartitem.id === prod.id);
  }
  return (
    <div className="product-page padding">
      <div className="productpage-top-sec">
        <div className="pp-top-sec-text">
          <div className="golden our-collection-text">- Our Collection</div>
          <div className="all-prod-text">
            All <span>Products</span>
          </div>
        </div>
        <div className="product-filter-list">
          {categories.map((cat) => {
            return (
              <button
                onClick={() => {
                  setFilter(cat);
                }}
                className={`p-filter-list ${filter.toLowerCase()===cat.toLowerCase() ? "p-active" : ""}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      <div className="poducts-container">
        {filtered.map((item) => {
          return (
            <div className="product" key={item.id}>
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
                <div className="prod-title">{item.title}</div>
                <div className="prod-rating">
                  {item.rating.rate}({item.rating.count})
                </div>
                <div className="prod-price-plus">
                  <div className="prod-price">${item.price}</div>
                  <button
                    style={{
                      background: checkincart(item) ? "green" : "#b8860b",
                    }}
                    onClick={() => {
                      addToCart(item);
                    }}
                    className="prod-plusbtn"
                  >
                    {checkincart(item) ? "✓" : "+"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
