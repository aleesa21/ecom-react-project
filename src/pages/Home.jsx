import { useContext } from "react";
import "../css/Home.css";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { useState } from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
export default function Home() {
  const { product } = useContext(ProductContext);
  const [filter, setFilter] = useState("all");
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

  const marquee=["Clothing", "Jewelery", "Women's clothing", "Men's clothing", "Electronics"]
  return (
    <>
      <main>
     <Hero />
     <section className="band">
       <div className="rotating" aria-label="Shop by category">
         {[0, 1].map((g) => (
           <div className="group" key={g} aria-hidden={g > 0}>
             {marquee.map((c) => (
               <div className="item" key={c}>
                 <i className="dot" />
                 {c}
               </div>
             ))}
           </div>
         ))}
       </div>
     </section>
        
        
     <FeaturedProducts
       categories={categories}
       filter={filter}
       setFilter={setFilter}
       items={filtered}
       addToCart={addToCart}
       checkincart={checkincart}
     />
      </main>
    </>
  );
}
