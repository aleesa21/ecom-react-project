import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import "../css/Header.css";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

/* inline icons so they follow the text colour */
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const SearchIcon = () => (
  <Icon>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4-4" />
  </Icon>
);
const CartIcon = () => (
  <Icon>
    <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2" />
    <circle cx="9.5" cy="19.5" r="1.2" />
    <circle cx="17" cy="19.5" r="1.2" />
  </Icon>
);
const HeartIcon = () => (
  <Icon>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </Icon>
);
const MenuIcon = ({ open }) => (
  <Icon>{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</Icon>
);

export default function Header() {
  const { loggedInUser, logout } = useContext(AuthContext);
  const { cart, count } = useContext(CartContext);
  const [menuopen, setMenuopen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const headerRef = useRef(null);
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  // close the mobile menu when the page changes
  useEffect(() => setMenuopen(false), [pathname]);

  // track scrolling:
  //  - scrolled  -> thin bottom line
  //  - overHero  -> still inside the hero section (header uses the hero colour)
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);

      const hero = document.querySelector(".hero");
      const headerH = headerRef.current ? headerRef.current.offsetHeight : 0;
      if (!isHome || !hero) {
        setOverHero(false);
        return;
      }
      // hero is "behind" the header until its bottom edge reaches the header
      setOverHero(hero.getBoundingClientRect().bottom > headerH + 1);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome, pathname]);

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header
      ref={headerRef}
      className={`${isHome && overHero ? "on-hero" : ""} ${scrolled ? "scrolled" : ""}`}
    >
      <nav className="navbar">
        <div className="nav-left-logo">
          <button
            type="button"
            className="icon-btn hamburger"
            onClick={() => setMenuopen(!menuopen)}
            aria-label={menuopen ? "Close menu" : "Open menu"}
            aria-expanded={menuopen}
          >
            <MenuIcon open={menuopen} />
          </button>
          <Link to="/" className="nav-logo" aria-label="MART home">
            <span>MA</span>
            <em>RT</em>
          </Link>
        </div>

        <div className="nav-links">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/wishlist" className={linkClass}>Wishlist</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </div>

        {/* hook onSubmit up to your search when you are ready */}
        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search products"
            className="search-input"
            aria-label="Search products"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <SearchIcon />
          </button>
        </form>

        <div className="nav-right-logo">
          <button type="button" className="icon-btn search-icon" aria-label="Search">
            <SearchIcon />
          </button>
          <Link to="/wishlist" className="icon-btn wishlist-icon" aria-label="Wishlist">
            <HeartIcon />
          </Link>
          <Link to="/cart" className="icon-btn header-cart" aria-label="Cart">
            <CartIcon />
            {cart.length > 0 && <span>{count}</span>}
          </Link>

          {loggedInUser ? (
            <div className="logout-and-name">
              <span>Hi, {loggedInUser.name.split(" ")[0]}</span>
              <button type="button" className="nav-logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="header-login-btn">Login</Link>
              <Link to="/signup" className="header-signup-btn">Sign up</Link>
            </>
          )}
        </div>
      </nav>

      {/* mobile menu: always rendered so it can slide */}
      <div className={`mobile-menu ${menuopen ? "open" : ""}`} aria-hidden={!menuopen}>
        <div className="mobile-menu-inner">
          <Link to="/" tabIndex={menuopen ? 0 : -1}>Home</Link>
          <Link to="/products" tabIndex={menuopen ? 0 : -1}>Products</Link>
          <Link to="/wishlist" tabIndex={menuopen ? 0 : -1}>Wishlist</Link>
          <Link to="/about" tabIndex={menuopen ? 0 : -1}>About</Link>
        </div>
      </div>
    </header>
  );
}