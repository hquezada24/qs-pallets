import styles from "@/styles/CTA.module.css";

const CTA = () => {
  return (
    <section
      className={`${styles.section} ${styles.finalCta}`}
      aria-labelledby="final-cta-heading"
    >
      <div className={styles.sectionContent}>
        <div
          className={styles.ctaCard}
          role="region"
          aria-label="Get Started Call to Action"
        >
          <h2 id="final-cta-heading">Ready to Get Started?</h2>
          <p>
            Experience the QS Pallets difference. Get a custom quote tailored to
            your specific needs, or speak with our experts to find the perfect
            solution.
          </p>

          <div
            className={styles.ctaButtons}
            role="group"
            aria-label="Call to action buttons"
          >
            <a
              className={`${styles.primaryCtaButton} mr-2`}
              aria-label="Contact QS Pallets"
              href={"mailto:qspallets@gmail.com"}
            >
              Email us
            </a>
            <a
              className={styles.secondaryCtaButton}
              aria-label="Contact QS Pallets"
              href={"tel:+19034010536"}
            >
              Text us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
