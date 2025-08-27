import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const FeaturedProducts = () => {
  return (
    <div className={styles.featuredProducts}>
      <div className={styles.new}>
        <div className={styles.imgContainer}>
          <div className={styles.img}></div>
        </div>
        <div className={styles.description}>
          <h3>Standard wood pallet</h3>
          <p>Our most popular new pallet, perfect for general shipping.</p>
        </div>
      </div>
      <div className={styles.recycled}>
        <div className={styles.imgContainer}>
          <div className={styles.img}></div>
        </div>
        <div className={styles.description}>
          <h3>Standard wood pallet</h3>
          <p>Our most popular new pallet, perfect for general shipping.</p>
        </div>
      </div>
      <div className={styles.custom}>
        <div className={styles.imgContainer}>
          <div className={styles.img}></div>
        </div>
        <div className={styles.description}>
          <h3>Standard wood pallet</h3>
          <p>Our most popular new pallet, perfect for general shipping.</p>
        </div>
      </div>
      <Button text={"See Products"} />
    </div>
  );
};

export { FeaturedProducts };
