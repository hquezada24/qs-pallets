import styles from "./Styles.module.css";

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
        <button className={styles.quoteButton}>Get Quote</button>
        <button className={styles.learnMoreButton}>Learn More</button>
      </div>
    </div>
  );
};

export { Product };
