import "./Home.css";
export default function Home() {
  return (
    // <><div>this is home</div></>
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
                  <button className="explore-btn">Explore Collection</button>
                  <button className="ourstory-btn">Our Story</button>
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
          <div className="padding hr">
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
            <div className="featured-text">Featured <span>Products</span></div>
            <div className="select-list">
              <div className="filter-list">✦ All</div>
              <div className="filter-list">Men's clothing</div>
              <div className="filter-list">Jwellery</div>
              <div className="filter-list">Electronics</div>
              <div className="filter-list">Women's Clothing</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
