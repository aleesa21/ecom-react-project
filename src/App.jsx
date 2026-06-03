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
          <RouterProvider router={router} />
        </ProductProvider>
      </AuthProvider>
    </>
  );
}
