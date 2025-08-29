import { Button } from "../common/Button/Index";
import styles from "./Styles.module.css";

const QuoteForm = () => {
  return (
    <div className={styles.form}>
      <form>
        <fieldset className={styles.contact}>
          <legend>Contact Information</legend>

          <div className="input">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" type="text" placeholder="John Doe" required />
          </div>
          <div className="input">
            <label htmlFor="companyName">Company Name (Optional)</label>
            <input id="companyName" type="text" />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="john.doe@email.com"
              required
            />
          </div>
          <div className="input">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="(555) 555-5555"
              required
            />
          </div>
        </fieldset>

        <fieldset className={styles.details}>
          <legend>Quote Details</legend>
          <div className="input">
            <label htmlFor="palletType">Pallet Type</label>
            <select id="palletType" required>
              <option value="">--Please choose an option--</option>
              <option value="new">New Pallets</option>
              <option value="recycled">Recycled Pallets</option>
              <option value="custom">Custom Pallets</option>
            </select>
          </div>

          <div className="input">
            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" type="number" min="1" required />
          </div>
          <div className="input">
            <label htmlFor="comments">Additional Details</label>
            <textarea id="comments" rows="4"></textarea>
          </div>
        </fieldset>

        <fieldset className={styles.delivery}>
          <legend>Delivery Address</legend>
          <label htmlFor="street">Street</label>
          <input id="street" type="text" />

          <label htmlFor="city">City</label>
          <input id="city" type="text" />

          <label htmlFor="state">State</label>
          <input id="state" type="text" />
          <label htmlFor="zip">Zip</label>
          <input id="zip" type="text" />
        </fieldset>

        <Button text={"Submit Request"} type={"submit"} />
      </form>
    </div>
  );
};

export default QuoteForm;
