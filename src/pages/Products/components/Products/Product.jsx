import styles from "./Styles.module.css";

const Product = ({ title, description }) => {
  return (
    <div className={styles.product}>
      <div className={styles.img}></div>
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export { Product };
