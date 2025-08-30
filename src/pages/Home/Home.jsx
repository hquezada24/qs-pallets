import styles from "./Styles.module.css";
import { Hero } from "./Components/Hero/Hero";
import { Button } from "../../components/common/Button/Index";
import { FeaturedProducts } from "./Components/FeaturedProducts/FeaturedProducts";
import { WhyChooseUs } from "./Components/WhyChooseUs/WhyChooseUs";
import { CallToAction } from "./Components/CallToAction/CallToAction";

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
};

export { Home };
