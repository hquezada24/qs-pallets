import styles from "./Styles.module.css";
import { Hero } from "./Components/Hero/Hero";

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
    </div>
  );
};

export { Home };
