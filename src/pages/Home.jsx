import { useContext } from "react";
import "../css/Home.css";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import { useState } from "react";
import Hero from "../components/Hero";
export default function Home() {
  const { product } = useContext(ProductContext);
  const [filter, setFilter] = useState("all");
  let navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const categories = ["All",...new Set(product.map((prod) => prod.category))];

  const filtered =
    filter.toLocaleLowerCase() === "all"
      ? product
      : product?.filter(
          (prod) => prod.category.toLowerCase() == filter.toLowerCase(),
        );
  function checkincart(prod) {
    return cart.find((cartitem) => cartitem.id === prod.id);
  }
  return (
    <>
      <main>
     <Hero />
        <section>
          <div className="padding hr-home">
            <hr></hr>
          </div>

          <div className="section2">
            <div className="section2-top padding">
              <div>
                <div className="sec-2-num">20K+</div>
                <div className="sec-2-text">Products</div>
              </div>
              <div>
                <div className="sec-2-num">150K</div>
                <div className="sec-2-text">Customers</div>
              </div>
              <div>
                <div className="sec-2-num">4.9★</div>
                <div className="sec-2-text">Avg Rating</div>
              </div>
            </div>
            <div className="section2-down">
              <div className="rotating">
                <div className="group">
                  <div>• CLOTHING</div>
                  <div>• JEWELERY</div>
                  <div>• ELECTRONICS</div>
                  <div>• WOMEN'S CLOTHING</div>
                  <div>• MEN'S CLOTHING</div>
                </div>
                <div className="group">
                  <div>• CLOTHING</div>
                  <div>• JEWELERY</div>
                  <div>• ELECTRONICS</div>
                  <div>• WOMEN'S CLOTHING</div>
                  <div>• MEN'S CLOTHING</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="section-3 padding">
            <div className="golden sec3-top-text">Curated For You</div>
            <div className="featured-text">
              Featured <span>Products</span>
            </div>
            <div className="select-list">
             
              {categories.map((cat) => {
                return (
                  <button key={cat}
                    className={`filter-list ${filter.toLowerCase()===cat.toLowerCase()?"filter-active":""}`}
                    onClick={() => {
                      setFilter(cat);
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="poducts-container">
              {filtered.slice(0, 8).map((item) => {
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
        </section>
      </main>
    </>
  );
}
