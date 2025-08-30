import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const Hero = () => {
  const handleProductsClick = () => {
    // Add your navigation logic here
    console.log("Navigate to products");
  };

  return (
    <section className={styles.hero} role="banner">
      <div className={styles.background}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>The Right Pallets, Every Time</h1>
          <p className={styles.subtitle}>
            We provide reliable pallet supply and custom solutions so you can
            focus on your business, not your logistics
          </p>
          <div className={styles.ctaContainer}>
            <Button
              text="See Products"
              variant="primary"
              onClick={handleProductsClick}
              ariaLabel="View our pallet products and solutions"
            />
            <Button
              text="Get Quote"
              variant="secondary"
              onClick={() => console.log("Navigate to quote")}
              ariaLabel="Request a custom pallet quote"
            />
          </div>
        </div>
      </div>
      <div className={styles.overlay} aria-hidden="true" />
    </section>
  );
};

export { Hero };
