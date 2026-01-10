import styles from "@/styles/WhyChooseUse.module.css";

const fetchFeatures = async () => {
  const res = await fetch(`${process.env.API_URL}/why-choose-us`);

  if (!res.ok) {
    throw new Error("Failed to fetch features");
  }
  return res.json();
};

const WhyChooseUs = async () => {
  const features = await fetchFeatures();
  return (
    <section className={styles.section} aria-labelledby="why-choose-us-heading">
      <div className={styles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2 id="why-choose-us-heading">{features.title}</h2>
          <p>{features.description}</p>
        </div>

        <div className={styles.featuresGrid} aria-label="Reasons to choose us">
          {features.features?.map((feature, index) => (
            <div key={index} className={styles.featureCard} role="listitem">
              <span className={styles.featureIcon} aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
