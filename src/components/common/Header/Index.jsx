import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>QS Pallets</h1>
      </div>
      <div className={styles.dropdown}>
        <button
          className={styles.dropbtn}
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <FontAwesomeIcon className={styles.icon} icon={faBars} />
        </button>
        <div
          className={`${styles.dropdownContent} ${
            isToggled ? styles.show : ""
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/request-a-quote">Request a Quote</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>{" "}
            {/* Fixed typo: "Producs" → "Products" */}
          </li>
          <li>
            <Link to="/request-a-quote">Request a Quote</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
