import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const CallToAction = () => {
  return (
    <div className={styles.callToAction}>
      <div className="background">
        <div className={styles.heroText}>
          <h2>
            Ready to get started? Contact us today to discuss your pallet needs.
          </h2>
          <Button text={"Request a quote"} />
        </div>
      </div>
    </div>
  );
};

export { CallToAction };
