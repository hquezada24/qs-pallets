import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const FeaturedProducts = ({ products }) => {
  if (!products) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2>{products.title}</h2>
          <p>{products.description}</p>
        </div>

        <div className={styles.featuresGrid}>
          {products.products?.map((product, index) => (
            <div key={index} className={styles.featureCard}>
              {console.log(product.icon)}
              <span className={styles.featureIcon}>{product.icon}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div style={{ marginTop: "1.5rem" }}>
                <Button text="Learn More" link="/products" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeaturedProducts };
