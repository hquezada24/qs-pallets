import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h4>Our location</h4>
          <p>
            <i></i>
            [Dirección de tu empresa, Ciudad, Código Postal]
          </p>
          <p>
            <i></i>
            [Número de teléfono]
          </p>
          <p>
            <i></i>
            <a href="mailto:info@qspallets.com">info@qspallets.com</a>
          </p>
        </div>

        <div className={styles.links}>
          <h4>Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/request-a-quote">Request a Quote</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className={styles.social}>
          <h4>Follow us</h4>
          <div>
            <a href="https://www.facebook.com/?locale=es_LA" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://es.linkedin.com/" target="_blank">
              <i></i>
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>&copy; 2025 QS Pallets. All rights reserved.</p>
      </div>
    </footer>
  );
};

export { Footer };
