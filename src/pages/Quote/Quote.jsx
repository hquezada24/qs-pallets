import styles from "./Styles.module.css";
import QuoteForm from "../../components/forms/QuoteForm";
import { ScrollRestoration } from "react-router-dom";

const Quote = () => {
  return (
    <div className={styles.quote} id="quote">
      <ScrollRestoration />
      <QuoteForm />
    </div>
  );
};

export { Quote };
