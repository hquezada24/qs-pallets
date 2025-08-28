import styles from "./Styles.module.css";
import { Product } from "./components/Products/Product";

const Products = () => {
  return (
    <div className={styles.products}>
      <div className={styles.container}>
        <Product title={"Standard Pallets"} description={"description"} />
        <Product title={"Recycled Pallets"} description={"description"} />
        <Product title={"Custom Pallets"} description={"description"} />
      </div>
    </div>
  );
};

export { Products };
