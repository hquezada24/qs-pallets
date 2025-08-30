import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

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
            <button className={styles.primaryCtaButton}>Request Quote</button>
            <button className={styles.secondaryCtaButton}>Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CallToAction };
