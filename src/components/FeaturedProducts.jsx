import styles from "@/styles/Featured.module.css";
import Button from "./Button";

const fetchProducts = async () => {
  const res = await fetch(`${process.env.API_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

const FeaturedProducts = async () => {
  const products = await fetchProducts();
  return (
    <section
      className={styles.section}
      aria-labelledby="featured-products-title"
    >
      <div className={styles.sectionContent}>
        <div className={styles.sectionHeader}>
          <h2 id="featured-products-title">{products.title}</h2>
          <p>{products.description}</p>
        </div>

        <div className={styles.featuresGrid}>
          {products.products?.map((product, index) => (
            <div key={index} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">
                {product.icon}
              </span>
              <h3>{product.name}</h3>
              <p>{product.index_page_description}</p>
              <div style={{ marginTop: "1.5rem" }}>
                <Button
                  text="Learn More"
                  link="/products"
                  aria-label={`Learn more about ${product.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
