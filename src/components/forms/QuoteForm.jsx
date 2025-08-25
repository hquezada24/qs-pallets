const QuoteForm = () => {
  return (
    <div>
      <form>
        <fieldset>
          <legend>Contact Information</legend>
          <label for="fullName">Full Name</label>
          <input id="fullName" type="text" placeholder="John Doe" required />

          <label for="companyName">Company Name (Optional)</label>
          <input id="companyName" type="text" />

          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john.doe@email.com"
            required
          />

          <label for="phone">Phone</label>
          <input id="phone" type="tel" placeholder="(555) 555-5555" required />
        </fieldset>

        <fieldset>
          <legend>Quote Details</legend>
          <label for="palletType">Pallet Type</label>
          <select id="palletType" required>
            <option value="">--Please choose an option--</option>
            <option value="new">New Pallets</option>
            <option value="recycled">Recycled Pallets</option>
            <option value="custom">Custom Pallets</option>
          </select>

          <label for="quantity">Quantity</label>
          <input id="quantity" type="number" min="1" required />

          <label for="comments">Additional Details</label>
          <textarea id="comments" rows="4"></textarea>
        </fieldset>

        <fieldset>
          <legend>Delivery Address</legend>
          <label for="street">Street</label>
          <input id="street" type="text" />

          <label for="city">City</label>
          <input id="city" type="text" />

          <label for="state">State</label>
          <input id="state" type="text" />
        </fieldset>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export { QuoteForm };
