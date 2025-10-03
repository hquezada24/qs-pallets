import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const Product = ({ product }) => {
  return (
    <div
      className={styles.productCard}
      role="article"
      aria-labelledby={`product-${product.id}-title`}
    >
      <div className={styles.productHeader}>
        {/* Product Image (accessible if meaningful) */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
          />
        ) : (
          <div className={styles.productImage} aria-hidden="true"></div>
        )}

        {/* Product Title */}
        <div className={styles.productTitle}>
          <h3 id={`product-${product.id}-title`}>{product.name}</h3>
        </div>

        {/* Product Price */}
        {product.price && (
          <p
            className={styles.productPrice}
            aria-label={`Price: ${product.price}`}
          >
            {product.price}
          </p>
        )}
      </div>

      {/* Product Description */}
      <div className={styles.productDescription}>
        <p>{product.description}</p>
      </div>

      {/* Features */}
      {product.key_features?.length > 0 && (
        <div className={styles.productFeatures}>
          <h4>Key Features</h4>
          <ul>
            {product.key_features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className={styles.productActions}>
        <Button
          text="Get Quote"
          link="/request-a-quote"
          aria-label={`Get a quote for ${product.name}`}
        />
      </div>
    </div>
  );
};

export { Product };
