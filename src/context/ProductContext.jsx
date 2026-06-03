import { createContext, useEffect, useState } from "react"

 export const ProductContext = createContext()

 export  function ProductProvider({children}){
     let [product, setProduct] = useState([])
     async function fetchProducts() {
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error(await res.text());
      }
      let datas = await res.json();
      localStorage.setItem("products", JSON.stringify(datas))
      setProduct(datas);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const storeddata=localStorage.getItem("products")
    if(storeddata){
        setProduct(JSON.parse(storeddata))
    }
    else{
      fetchProducts();
    }
    
  }, []);

  return <ProductContext.Provider value={{product}}>
           {children}
  </ProductContext.Provider>

}