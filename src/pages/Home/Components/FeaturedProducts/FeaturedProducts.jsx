import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const FeaturedProducts = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2>Our Product Range</h2>
          <p>
            From standard shipping pallets to custom solutions, we have the
            right pallet for every application and budget.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🆕</span>
            <h3>New Pallets</h3>
            <p>
              Premium quality pallets built from high-grade materials. Perfect
              for applications requiring maximum durability and consistency.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Button text="Learn More" />
            </div>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>♻️</span>
            <h3>Recycled Pallets</h3>
            <p>
              Cost-effective and environmentally responsible. Our recycled
              pallets are thoroughly inspected and refurbished to meet quality
              standards.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Button text="Learn More" />
            </div>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🔧</span>
            <h3>Custom Pallets</h3>
            <p>
              Specialized solutions for unique requirements. Any size, any
              specification - we'll create the perfect pallet for your needs.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Button text="Learn More" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FeaturedProducts };
