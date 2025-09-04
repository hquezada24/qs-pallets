import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const Product = ({ product }) => {
  return (
    <div className={`${styles.productCard}`}>
      <div className={styles.productHeader}>
        <div className={styles.productImage}></div>
        <div className={styles.productTitle}>
          <h3>{product.name}</h3>
        </div>
        <div className={styles.productPrice}>{product.price}</div>
      </div>

      <div className={styles.productDescription}>
        <p>{product.description}</p>
      </div>

      <div className={styles.productFeatures}>
        <h4>Key Features</h4>
        <ul>
          {product.key_features.map((feature, index) => (
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
