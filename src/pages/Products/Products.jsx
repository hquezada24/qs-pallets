import styles from "./Styles.module.css";
import { Product } from "./components/Products/Product";
import { Link, ScrollRestoration } from "react-router-dom";
import { useProductsData } from "../../hooks/useProductsData";

const Products = () => {
  const { data, loading, error } = useProductsData();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.products}>
      <ScrollRestoration />
      <div className={styles.hero}>
        <h1>Our Products</h1>
        <p className={styles.subtitle}>
          Comprehensive pallet solutions designed to meet every shipping and
          storage need
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.intro}>
          <h2>Quality Pallets for Every Need</h2>
          <p>
            At QS Pallets, we understand that different industries and
            applications require different pallet solutions. That's why we offer
            a comprehensive range of products, from cost-effective recycled
            options to premium custom-built pallets. Every product in our lineup
            is backed by our commitment to quality, reliability, and customer
            satisfaction.
          </p>
        </div>

        <div className={styles.productGrid}>
          {data.products?.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>

        <div className={styles.additionalServices}>
          <h2>Additional Services</h2>
          <div className={styles.servicesGrid}>
            {data.additionalServices?.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.specifications}>
          <h2>Standard Specifications</h2>
          <div className={styles.specTable}>
            <div className={styles.specHeader}>
              {data.specifications.headers.map((header, index) => (
                <div key={index}>{header}</div>
              ))}
            </div>
            {data.specifications.rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.specRow}>
                {row.map((col, colIndex) => (
                  <div
                    key={colIndex}
                    data-label={
                      colIndex > 0
                        ? data.specifications.headers[colIndex]
                        : undefined
                    }
                  >
                    {col}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Ready to Find Your Perfect Pallet Solution?</h2>
            <p>
              Our team is here to help you choose the right products for your
              specific needs.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>
                <Link to={"/request-a-quote"}>Request a Quote</Link>
              </button>
              <button className={styles.secondaryButton}>
                <Link to={"/contact"}>Contact Us</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Products };
