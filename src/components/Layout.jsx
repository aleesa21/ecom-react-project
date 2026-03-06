import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Home from "../pages/Home";

export default function Layout(){
    return<>
    <Header />
    <Outlet />
    {/* <Footer /> */}
    
    </>
}