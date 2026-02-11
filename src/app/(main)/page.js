import styles from "./page.module.css";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}
