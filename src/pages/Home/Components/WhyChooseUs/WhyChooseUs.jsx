import styles from "./Styles.module.css";

const WhyChooseUs = () => {
  return (
    <div className={styles.whyChooseUs}>
      <h2>Why Choose Us</h2>
      <div className={styles.reasons}>
        <div className={styles.reason}>
          <h3>Quality & Durability</h3>
          <p>We use high-grade materials for long-lasting products.</p>
        </div>
        <div className={styles.reason}>
          <h3>Reliable Service</h3>
          <p>On-time delivery and fast turnaround.</p>
        </div>
        <div className={styles.reason}>
          <h3>Expertise</h3>
          <p>Years of experience in the industry.</p>
        </div>
      </div>
    </div>
  );
};

export { WhyChooseUs };
