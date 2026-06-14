import { useContext, useEffect, useState } from "react";
import "../css/Home.css";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router"
export default function Home() {
  const { product } = useContext(ProductContext);
  let navigate= useNavigate();
  return (
    <>
      <main>
        <section>
          <div className="hero-section">
            <div className="hero-main-section">
              <div className="hero-left-sec">
                <div className="golden newarrival-text">
                  New Season Arrivals
                </div>
                <h1 className="discover-text">
                  Discover <br />
                  <i
                    className="
                golden"
                  >
                    Extraordinary
                  </i>
                  <br /> Products
                </h1>
                <p>
                  Curated collections from around the world. Premium quality,
                  unbeatable prices — everything you desire, delivered to your
                  door.
                </p>
                <div className="hero-left-btns">
                  <button className="explore-btn" onClick={()=>{
                    navigate("/products")
                  }}>Explore Collection</button>
                  <button className="ourstory-btn" onClick={()=>{
                    navigate("/about")
                  }}>Our Story</button>
                </div>
              </div>
              <div className="hero-right-sec">
                <div className="floating-container">
                  <div className="floating-child fc1">
                    <img
                      src="f1.png"
                      alt="image"
                      className="image-card-home"
                    ></img>
                  </div>
                  <div className="floating-child fc2">
                    <img
                      src="f2.png"
                      alt="image"
                      className="image-card-home"
                    ></img>
                  </div>
                  <div className="floating-child fc3">
                    <img
                      src="f3.png"
                      alt="image"
                      className="image-card-home"
                    ></img>
                  </div>
                  <div className="floating-child fc4">
                    <img
                      src="f4.png"
                      alt="image"
                      className="image-card-home"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
              <div className="filter-list">✦ All</div>
              <div className="filter-list">Men's clothing</div>
              <div className="filter-list">Jwellery</div>
              <div className="filter-list">Electronics</div>
              <div className="filter-list">Women's Clothing</div>
            </div>
            <div className="poducts-container">
              {product.slice(0, 8).map((item) => {
                return <div className="product" key={item.id}>
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
              <button className="prod-plusbtn">+</button>
            </div>
          </div>
        </div>
                  
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
