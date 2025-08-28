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
          <a href="#">Home</a>
          <Link to="products">Products</Link>
          {/* <a href="#">Products</a> */}
          <a href="#">Request a Quote</a>
          <a href="#">About Us</a>
        </div>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Producs</a>
          </li>
          <li>
            <a>Request a Quote</a>
          </li>
          <li>
            <a>About Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
