import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";
import { Link } from "react-router-dom";

const Product = ({
  title,
  subtitle,
  description,
  features,
  price,
  image,
  accent = "primary",
}) => {
  return (
    <div className={`${styles.productCard} ${styles[accent]}`}>
      <div className={styles.productHeader}>
        <div className={styles.productImage}>{image}</div>
        <div className={styles.productTitle}>
          <h3>{title}</h3>
          <p className={styles.productSubtitle}>{subtitle}</p>
        </div>
        <div className={styles.productPrice}>{price}</div>
      </div>

      <div className={styles.productDescription}>
        <p>{description}</p>
      </div>

      <div className={styles.productFeatures}>
        <h4>Key Features</h4>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className={styles.productActions}>
        <Button text={"Get Quote"} link="/request-a-quote"></Button>
      </div>
    </div>
  );
};

export { Product };
