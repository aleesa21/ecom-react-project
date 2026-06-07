import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import About from "./pages/About";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Loginlayout from "./components/Loginlayout";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Cart from "./components/Cart";
import CartProvider from "./context/CartContext";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/footer",
        element: <Footer />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
      {
        path:"/cart",
        element:<Cart />
      }
    ],
  },
  {
    element: <Loginlayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
          <RouterProvider router={router} />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
}
