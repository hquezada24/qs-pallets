import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Styles.module.css";
import logoURL from "../../../assets/qspallets.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/request-a-quote", label: "Request Quote" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink} aria-label="QS Pallets Home">
            <img src={logoURL} alt="" className={styles.logoPng} />
            <span className={styles.brandName}>QS Pallets</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navigation} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {" "}
            {/* Ensure list semantics preserved */}
            {navigationItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    isActiveLink(item.path) ? styles.activeLink : ""
                  }`}
                  aria-current={isActiveLink(item.path) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className={styles.mobileMenu} ref={menuRef}>
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            <span className={styles.hamburger} aria-hidden="true">
              <span
                className={`${styles.line} ${
                  isMenuOpen ? styles.lineActive : ""
                }`}
              ></span>
              <span
                className={`${styles.line} ${
                  isMenuOpen ? styles.lineActive : ""
                }`}
              ></span>
              <span
                className={`${styles.line} ${
                  isMenuOpen ? styles.lineActive : ""
                }`}
              ></span>
            </span>
          </button>

          {/* Mobile Navigation Dropdown */}
          <nav
            className={`${styles.mobileNav} ${
              isMenuOpen ? styles.mobileNavOpen : ""
            }`}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            aria-hidden={!isMenuOpen}
          >
            <ul className={styles.mobileNavList} role="list">
              {navigationItems.map((item) => (
                <li key={item.path} className={styles.mobileNavItem}>
                  <Link
                    to={item.path}
                    className={`${styles.mobileNavLink} ${
                      isActiveLink(item.path) ? styles.activeMobileLink : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActiveLink(item.path) ? "page" : undefined}
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export { Header };
