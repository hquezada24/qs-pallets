import styles from "./Styles.module.css";
import { Hero } from "./components/Hero/Hero";

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
    </div>
  );
};

export { Home };
