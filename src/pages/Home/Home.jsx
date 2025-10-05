import styles from "./Styles.module.css";
import { Hero } from "./Components/Hero/Hero";
import { ScrollRestoration } from "react-router-dom";
import { FeaturedProducts } from "./Components/FeaturedProducts/FeaturedProducts";
import { WhyChooseUs } from "./Components/WhyChooseUs/WhyChooseUs";
import { CallToAction } from "./Components/CallToAction/CallToAction";
import { useHomeData } from "../../hooks/useHomeData";

const Home = () => {
  const { data, loading, error } = useHomeData();

  if (loading)
    return (
      <div className={styles.contentWrapper}>
        <ScrollRestoration />
        <div className={styles.loading}>Loading ...</div>;
      </div>
    );
  if (error)
    return (
      <div className={styles.contentWrapper}>
        <ScrollRestoration />
        <div className={styles.error}>Error: {error}</div>;
      </div>
    );

  return (
    <div className={styles.home}>
      <ScrollRestoration />
      <Hero />
      <FeaturedProducts products={data?.features} />
      <WhyChooseUs features={data?.whyChooseUs} />
      <CallToAction />
    </div>
  );
};

export { Home };
