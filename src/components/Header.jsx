import { useState } from "react";
import "./Header.css";
import { Link } from "react-router";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
export default function Header() {
  const { loggedInUser, logout } = useContext(AuthContext)
    const [menuopen,setMenuopen]=useState(false)
    console.log(menuopen)
  return (
    <>
      <header>
        <nav className="navbar">
            <div className="nav-left-logo">
          <div className="hamburger" onClick={()=>{setMenuopen(!menuopen)}}>
            <img src="hamburger-menu.png" alt="cart-logo" />
          </div>
          <div className="nav-logo"><span>MA</span>RT</div>
          </div>
          <div className="nav-links">
           <Link to="/"> <div>Home</div></Link>
            <Link to="/products"><div>Products</div></Link>
            <Link to=""><div>Wishlist</div></Link>
            <Link to="/about"><div>About</div></Link>
            {/* <Link to="/signup"><div>Sign Up</div></Link> */}
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
            <div>
              <img src="cart.png" alt="cart-logo" />
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
