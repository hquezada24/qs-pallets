import styles from "./Styles.module.css";
import { Hero } from "./Components/Hero/Hero";
import { FeaturedProducts } from "./Components/FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <FeaturedProducts />
    </div>
  );
};

export { Home };
