import { useState } from "react";
import "../css/Header.css";
import { Link, NavLink } from "react-router";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext";
export default function Header() {
  const { loggedInUser, logout } = useContext(AuthContext)
  const {cart,count}=useContext(CartContext)
    const [menuopen,setMenuopen]=useState(false)
    console.log(menuopen)
  return (
    <>
      <header>
        <nav className="navbar">
            <div className="nav-left-logo">
          <div className="hamburger" onClick={()=>{setMenuopen(!menuopen)}}>
            <img src="hamburger-menu.png" alt="hamburger-menu" />
          </div>
          <div className="nav-logo"><span>MA</span>RT</div>
          </div>


          <div className="nav-links">
           <NavLink to="/" end className={({isActive})=>isActive?"nav-link active":"nav-link"}> Home</NavLink>
            <NavLink to="/products" className={({isActive})=>isActive?"nav-link active":"nav-link"}>Products</NavLink>
            <NavLink to="/wishlist" className={({isActive})=>isActive?"nav-link active":"nav-link"}>Wishlist</NavLink>
            <NavLink to="/about" className={({isActive})=>isActive?"nav-link active":"nav-link"}>About</NavLink>
            {/* <Link to="/signup">Sign Up</Link> */}
          </div> 



          <div className="search">
            <input type="text" placeholder="Search Products....." className="search-input" ></input>
            <button className="search-btn">🔍︎</button>
          </div>
          <div className="nav-right-logo">
            <div className="search-icon">
              <img src="search.png" alt="search-logo" />
            </div>
            <div className="wishlist-icon">
              ♡
            </div>
            <div className="header-cart">
              <Link to="/cart"><img src="cart.png" alt="cart-logo" /></Link>
              {cart.length>0 && <span>{count}</span>}
              
            </div>
            {loggedInUser ?(
              <>
              <div className="logout-and-name">
              <span>Hi,{loggedInUser.name.split(" ")[0]}</span>
              <button className="nav-logout-btn" onClick={logout}>Logout</button>
              </div>
              </>
            ):<> <div>
             <Link to="/login"><button className="header-login-btn">Login </button></Link>
            </div>
            <div>
             <Link to="/signup"><button className="header-signup-btn">Sign up </button></Link>
            </div></>}
           
          </div>
        </nav>
        {menuopen && <div className="mobile-menu">
           <Link to="/"><div>Home</div></Link> 
           <Link to="/products"> <div>Products</div></Link>
            <Link to="/about"><div>About</div></Link>
        </div> }
      </header>
    </>
  );
}
