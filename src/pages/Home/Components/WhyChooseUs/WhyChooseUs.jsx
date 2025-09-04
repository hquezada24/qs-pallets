import styles from "./Styles.module.css";

const WhyChooseUs = ({ features }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose QS Pallets?</h2>
          <p>
            We're not just another pallet supplier. We're your logistics
            partner, committed to providing solutions that keep your business
            moving forward.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>⚡</span>
            <h3>Fast Turnaround</h3>
            <p>
              Need pallets quickly? Our efficient production process and
              inventory management ensure fast delivery without compromising
              quality.
            </p>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🔧</span>
            <h3>Custom Solutions</h3>
            <p>
              Standard sizes not working? We create custom pallets tailored to
              your exact specifications, no matter how unique your requirements.
            </p>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💰</span>
            <h3>Competitive Pricing</h3>
            <p>
              Get the best value for your investment. Our efficient operations
              allow us to offer competitive prices without sacrificing quality.
            </p>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🤝</span>
            <h3>Trusted Partnership</h3>
            <p>
              We build lasting relationships with our clients. Count on us for
              reliable service, clear communication, and expert support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { WhyChooseUs };
