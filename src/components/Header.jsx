"use client";
import Link from "next/link";
import Image from "next/image";
import "@/styles/Header.css";

const Header = () => {
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
            <li className="navItem">
              <Link href="/products" className={`headerNavLink`}>
                Products
              </Link>
            </li>
            <li className="navItem">
              <Link href="/request-a-quote" className={`headerNavLink`}>
                Request a quote
              </Link>
            </li>
            <li className="navItem">
              <Link href="/about" className={`headerNavLink`}>
                About
              </Link>
            </li>
            <li className="navItem">
              <Link href="/contact" className={`headerNavLink`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        {/* <div className="mobileMenu" ref={menuRef}>
          <button
            className="menu-button"
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
              <li className="mobileNavItem">
                <Link href="/products" className={`mobileNavLink`}>
                  Products
                </Link>
              </li>
            </ul>
          </nav>
        </div> */}
      </div>
    </header>
  );
};

export { Header };
