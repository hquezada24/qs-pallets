import "@/styles/Footer.css";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footerContainer">
        <div className="section">
          <div className="footerLogo">
            <h3 className="brandName">QS Pallets</h3>
            <p className="tagline">Quality pallets for your business needs</p>
          </div>
        </div>

        <div className="section">
          <h4 className="sectionTitle">Contact Info</h4>
          <address className="contactInfo">
            <div className="contactItem">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>
                1415 FM 2216, <br />
                Honey Grove, TX 75446
              </span>
            </div>
            <div className="contactItem">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <a
                href="tel:+19034010536"
                className="contactLink"
                aria-label="Call us at (903) 401-0536"
              >
                (903) 401-0536
              </a>
            </div>
            <div className="contactItem">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <a
                href="mailto:qspallets@gmail.com"
                className="contactLink"
                aria-label="Email us at qspallets@gmail.com"
              >
                qspallets@gmail.com
              </a>
            </div>
          </address>
        </div>

        <div className="section">
          <h4 className="sectionTitle">Quick Links</h4>
          <nav className="footerLinks" aria-label="Footer navigation">
            <ul className="linksList" role="list">
              <li>
                <Link href="/" className="navLink">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="navLink">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/request-a-quote" className="navLink">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/about" className="navLink">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="navLink">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="bottom">
        <div className="bottomContainer">
          <p className="copyright">
            &copy; {currentYear} QS Pallets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
