import styles from "@/styles/CTA.module.css";
import Link from "next/link";

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
            <Link
              className={styles.primaryCtaButton}
              href="/request-a-quote"
              aria-label="Request a custom pallet quote"
            >
              Request Quote
            </Link>
            <Link className={styles.secondaryCtaButton} href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
