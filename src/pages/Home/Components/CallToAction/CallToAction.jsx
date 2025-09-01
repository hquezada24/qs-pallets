import styles from "./Styles.module.css";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className={`${styles.section} ${styles.finalCta}`}>
      <div className={styles.sectionContent}>
        <div className={styles.ctaCard}>
          <h2>Ready to Get Started?</h2>
          <p>
            Experience the QS Pallets difference. Get a custom quote tailored to
            your specific needs, or speak with our experts to find the perfect
            solution.
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryCtaButton}>
              <Link to="/request-a-quote">Request Quote</Link>
            </button>
            <button className={styles.secondaryCtaButton}>
              <Link to="/contact">Contact Us</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CallToAction };
