"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import "@/styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => {
    return location === path;
  };
  return (
    <header className={`header `}>
      <div className="container">
        <div className="logo">
          <Link href="/" className="logoLink" aria-label="QS Pallets Home">
            <Image
              src="/qspallets.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="logoPng"
            />
            <span className="brandName">QS Pallets</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {/* Desktop Navigation */}
        <nav className="navigation" aria-label="Main navigation">
          <ul className="navList" role="list">
            <li className={`navItem ${isActiveLink("/") ? "activeLink" : ""}`}>
              <Link href="/" className={`headerNavLink`}>
                Home
              </Link>
            </li>
            <li
              className={`navItem ${
                isActiveLink("/products") ? "activeLink" : ""
              }`}
            >
              <Link href="/products" className={`headerNavLink`}>
                Products
              </Link>
            </li>
            <li
              className={`navItem ${
                isActiveLink("/request-a-quote") ? "activeLink" : ""
              }`}
            >
              <Link href="/request-a-quote" className={`headerNavLink`}>
                Request a quote
              </Link>
            </li>
            <li
              className={`navItem ${
                isActiveLink("/about") ? "activeLink" : ""
              }`}
            >
              <Link href="/about" className={`headerNavLink`}>
                About
              </Link>
            </li>
            <li
              className={`navItem ${
                isActiveLink("/contact") ? "activeLink" : ""
              }`}
            >
              <Link href="/contact" className={`headerNavLink`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="mobileMenu" ref={menuRef}>
          <button
            className="hamburger-button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            <span className="hamburger" aria-hidden="true">
              <span className={`line ${isMenuOpen ? "lineActive" : ""}`}></span>
              <span className={`line ${isMenuOpen ? "lineActive" : ""}`}></span>
              <span className={`line ${isMenuOpen ? "lineActive" : ""}`}></span>
            </span>
          </button>

          <nav
            className={`mobileNav ${isMenuOpen ? "mobileNavOpen" : ""}`}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            aria-hidden={!isMenuOpen}
          >
            <ul className="mobileNavList" role="list">
              <li
                className={`mobileNavItem ${
                  isActiveLink("/") ? "activeMobileLink" : ""
                }`}
              >
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`mobileNavLink`}
                >
                  Home
                </Link>
              </li>
              <li
                className={`mobileNavItem ${
                  isActiveLink("/products") ? "activeMobileLink" : ""
                }`}
              >
                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className={`mobileNavLink`}
                >
                  Products
                </Link>
              </li>
              <li
                className={`mobileNavItem ${
                  isActiveLink("/request-a-quote") ? "activeMobileLink" : ""
                }`}
              >
                <Link
                  href="/request-a-quote"
                  onClick={() => setIsMenuOpen(false)}
                  className={`mobileNavLink`}
                >
                  Request a Quote
                </Link>
              </li>
              <li
                className={`mobileNavItem ${
                  isActiveLink("/about") ? "activeMobileLink" : ""
                }`}
              >
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`mobileNavLink`}
                >
                  About
                </Link>
              </li>
              <li
                className={`mobileNavItem ${
                  isActiveLink("/contact") ? "activeMobileLink" : ""
                }`}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`mobileNavLink`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export { Header };
