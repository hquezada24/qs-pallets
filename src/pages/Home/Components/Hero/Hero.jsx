import styles from "./Styles.module.css";
import { Button } from "../../../../components/common/Button/Index";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.heroText}>
          <h2>The Right Pallets, Every Time</h2>
          <p>
            We provide reliable pallet supply and custom solutions so you can
            focus on your business, not your logistics
          </p>
          <Button text={"See Products"} />
        </div>
      </div>
    </div>
  );
};

export { Hero };
