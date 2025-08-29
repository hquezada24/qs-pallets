import styles from "./Button.module.css";

const Button = ({ text, type = "button" }) => {
  return (
    <button className={styles.btn} type={type}>
      {text}
    </button>
  );
};

export { Button };
