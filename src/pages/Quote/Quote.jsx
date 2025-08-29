import styles from "./Styles.module.css";
import QuoteForm from "../../components/forms/QuoteForm";

const Quote = () => {
  return (
    <div className={styles.quote}>
      <QuoteForm />
    </div>
  );
};

export { Quote };
