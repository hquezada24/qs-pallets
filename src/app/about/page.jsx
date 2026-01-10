import Link from "next/link";
import styles from "@/styles/About.module.css";

const AboutPage = () => {
  return (
    <div className={styles.about}>
      <section
        className={`${styles.hero} ${styles.aboutSection}`}
        aria-labelledby="about-hero-title"
      >
        <h1 id="about-hero-title">About QS Pallets</h1>
        <p className={styles.subtitle}>
          Your trusted partner in supply chain solutions
        </p>
      </section>

      <div className={styles.container}>
        <section
          className={`${styles.mission} ${styles.aboutSection}`}
          aria-labelledby="mission-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="mission-title">Our Mission</h2>
          </div>
          <div className={styles.content}>
            <p>
              At QS Pallets, we&apos;re more than just a pallet supplier;
              we&apos;re a partner in your business&apos;s supply chain. Our
              mission is to provide high-quality, reliable pallet solutions that
              help our clients ship their products safely and efficiently.
              We&apos;re committed to delivering exceptional products and
              service, ensuring your logistics run smoothly from start to
              finish.
            </p>
          </div>
        </section>

        <section
          className={`${styles.story} ${styles.aboutSection}`}
          aria-labelledby="story-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="story-title">Our Story</h2>
          </div>
          <div className={styles.content}>
            <p>
              QS Pallets is a family-owned business built on dedication, hard
              work, and care for our customers. What started as a homegrown
              operation has grown into a trusted source for quality pallets that
              businesses can depend on. We value every order, big or small, and
              pride ourselves on offering personalized service with a focus on
              reliability and lasting relationships.
            </p>
          </div>
        </section>

        <section
          className={`${styles.products} ${styles.aboutSection}`}
          aria-labelledby="products-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="products-title">Our Products</h2>
            <p>
              We understand that every business has unique needs. That&apos;s
              why we offer a comprehensive range of pallet options to meet any
              requirement.
            </p>
          </div>
          <div className={styles.productGrid}>
            <article className={styles.productCard}>
              <div className={styles.productIcon} aria-hidden="true">
                🆕
              </div>
              <h3>Standard Pallets</h3>
              <p>
                Durable, custom-built pallets tailored to your exact
                specifications. Perfect for businesses that demand the highest
                quality and consistency.
              </p>
            </article>
            <article className={styles.productCard}>
              <div className={styles.productIcon} aria-hidden="true">
                ♻️
              </div>
              <h3>Recycled Pallets</h3>
              <p>
                A cost-effective and environmentally friendly option that helps
                reduce your carbon footprint while maintaining excellent quality
                standards.
              </p>
            </article>
            <article className={styles.productCard}>
              <div className={styles.productIcon} aria-hidden="true">
                🔧
              </div>
              <h3>Custom Pallets</h3>
              <p>
                Specialized solutions for unique products or challenging
                shipping requirements. We work with you to create the perfect
                fit.
              </p>
            </article>
          </div>
        </section>

        <section
          className={`${styles.why} ${styles.aboutSection}`}
          aria-labelledby="why-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="why-title">Why Choose QS Pallets</h2>
          </div>
          <div className={styles.reasonsGrid}>
            <article className={styles.reasonCard}>
              <div className={styles.reasonIcon} aria-hidden="true">
                ⭐
              </div>
              <h3>Quality You Can Trust</h3>
              <p>
                Our pallets are built to last. We use high-grade materials and
                rigorous quality control to ensure they can handle any load with
                confidence and reliability.
              </p>
            </article>
            <article className={styles.reasonCard}>
              <div className={styles.reasonIcon} aria-hidden="true">
                🤝
              </div>
              <h3>Commitment to Service</h3>
              <p>
                We pride ourselves on fast turnaround times, competitive
                pricing, and clear communication. Your business is our priority,
                and we go the extra mile to earn your trust.
              </p>
            </article>
            <article className={styles.reasonCard}>
              <div className={styles.reasonIcon} aria-hidden="true">
                ⚡
              </div>
              <h3>Fast & Reliable Delivery</h3>
              <p>
                Time is money in logistics. Our efficient production process and
                strategic partnerships ensure your pallets arrive exactly when
                you need them.
              </p>
            </article>
          </div>
        </section>

        <section
          className={`${styles.cta} ${styles.aboutSection}`}
          aria-labelledby="cta-title"
        >
          <div className={styles.ctaContent}>
            <h2 id="cta-title">Ready to Partner with Us?</h2>
            <p>
              Experience the QS Pallets difference. Let&apos;s build something
              great together.
            </p>
            <Link
              href="/request-a-quote"
              className={styles.ctaButton}
              aria-label="Get your custom pallet quote today"
            >
              Get Your Quote Today
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
