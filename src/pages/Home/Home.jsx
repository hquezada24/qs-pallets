import styles from "./Styles.module.css";
import { Hero } from "./Components/Hero/Hero";
import { FeaturedProducts } from "./Components/FeaturedProducts/FeaturedProducts";
import { CallToAction } from "./Components/CallToAction/CallToAction";

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <FeaturedProducts />
      <CallToAction />
    </div>
  );
};

export { Home };
