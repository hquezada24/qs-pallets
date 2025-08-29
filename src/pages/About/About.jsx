import styles from "./Styles.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.hero}>
        ``
        <h1>About QS Pallets</h1>
        <p className={styles.subtitle}>
          Your trusted partner in supply chain solutions
        </p>
      </div>

      <div className={styles.container}>
        <section className={styles.mission}>
          <div className={styles.sectionHeader}>
            <h2>Our Mission</h2>
          </div>
          <div className={styles.content}>
            <p>
              At QS Pallets, we're more than just a pallet supplier; we're a
              partner in your business's supply chain. Our mission is to provide
              high-quality, reliable pallet solutions that help our clients ship
              their products safely and efficiently. We're committed to
              delivering exceptional products and service, ensuring your
              logistics run smoothly from start to finish.
            </p>
          </div>
        </section>

        <section className={styles.story}>
          <div className={styles.sectionHeader}>
            <h2>Our Story</h2>
          </div>
          <div className={styles.content}>
            <p>
              Founded with a vision to revolutionize pallet solutions, QS
              Pallets has grown from a small family business to a trusted
              industry leader. We've built our reputation on unwavering quality,
              innovative solutions, and genuine care for our customers' success.
              Every pallet we produce carries the legacy of craftsmanship and
              the promise of reliability that has defined us for years.
            </p>
          </div>
        </section>

        <section className={styles.products}>
          <div className={styles.sectionHeader}>
            <h2>Our Products</h2>
            <p>
              We understand that every business has unique needs. That's why we
              offer a comprehensive range of pallet options to meet any
              requirement.
            </p>
          </div>
          <div className={styles.productGrid}>
            <div className={styles.productCard}>
              <div className={styles.productIcon}>🆕</div>
              <h3>New Pallets</h3>
              <p>
                Durable, custom-built pallets tailored to your exact
                specifications. Perfect for businesses that demand the highest
                quality and consistency.
              </p>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productIcon}>♻️</div>
              <h3>Recycled Pallets</h3>
              <p>
                A cost-effective and environmentally friendly option that helps
                reduce your carbon footprint while maintaining excellent quality
                standards.
              </p>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productIcon}>🔧</div>
              <h3>Custom Pallets</h3>
              <p>
                Specialized solutions for unique products or challenging
                shipping requirements. We work with you to create the perfect
                fit.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.why}>
          <div className={styles.sectionHeader}>
            <h2>Why Choose QS Pallets</h2>
          </div>
          <div className={styles.reasonsGrid}>
            <div className={styles.reasonCard}>
              <div className={styles.reasonIcon}>⭐</div>
              <h3>Quality You Can Trust</h3>
              <p>
                Our pallets are built to last. We use high-grade materials and
                rigorous quality control to ensure they can handle any load with
                confidence and reliability.
              </p>
            </div>
            <div className={styles.reasonCard}>
              <div className={styles.reasonIcon}>🤝</div>
              <h3>Commitment to Service</h3>
              <p>
                We pride ourselves on fast turnaround times, competitive
                pricing, and clear communication. Your business is our priority,
                and we go the extra mile to earn your trust.
              </p>
            </div>
            <div className={styles.reasonCard}>
              <div className={styles.reasonIcon}>⚡</div>
              <h3>Fast & Reliable Delivery</h3>
              <p>
                Time is money in logistics. Our efficient production process and
                strategic partnerships ensure your pallets arrive exactly when
                you need them.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Ready to Partner with Us?</h2>
            <p>
              Experience the QS Pallets difference. Let's build something great
              together.
            </p>
            <button className={styles.ctaButton}>
              <Link to="/request-a-quote#quote">Get Your Quote Today</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export { About };
