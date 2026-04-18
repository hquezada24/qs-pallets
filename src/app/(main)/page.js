import styles from "@/styles/About.module.css";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <div className={styles.home}>
        <Hero />
        <FeaturedProducts />
        <WhyChooseUs />
        <section
          className={`${styles.why} ${styles.aboutSection}`}
          aria-labelledby="why-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="why-title">Our location</h2>
          </div>
          <div className={styles.locationMap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.113795489258!2d-95.89587552674784!3d33.731873434583065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864b07114e106d8d%3A0x64f42033787c6c83!2sQS%20Pallets!5e0!3m2!1ses-419!2sus!4v1772481534227!5m2!1ses-419!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
        <CTA />
      </div>
    </>
  );
}
