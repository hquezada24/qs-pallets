import styles from "./Styles.module.css";

const WhyChooseUs = ({ features }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2>{features.title}</h2>
          <p>{features.description}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.features?.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { WhyChooseUs };
