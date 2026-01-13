"use client";
import { useState } from "react";
import Button from "./Button";
import styles from "@/styles/QuoteForm.module.css";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: "Hugo",
    companyName: "",
    email: "em@mail.com",
    phone: "9034019096",
    palletType: "STANDARD",
    quantity: "100",
    address: {
      street: "1415 FM 2216",
      city: "Honey Grove",
      state: "TX",
      zipCode: "75446",
    },
    additionalDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.API_URL || "http://localhost:3000/api";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.palletType) {
      newErrors.palletType = "Please select a pallet type";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (parseInt(formData.quantity) < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "street" ||
      name === "city" ||
      name === "zipCode" ||
      name === "state"
    ) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Make the API call
      console.log("Attempting to fetch from:", process.env.NEXT_PUBLIC_API_URL);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/request-a-quote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send the actual formData
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Only clear the form AFTER successful submission
      setSubmitStatus("success");
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        palletType: "",
        quantity: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
        additionalDetails: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Quote submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.quotePage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Request a Quote</h1>
          <p className={styles.subtitle}>
            Get a custom quote for your pallet needs. We&apos;ll respond with
            competitive pricing within 24 hours.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.formSection}>
            <div className={styles.formHeader}>
              <h2>Tell Us About Your Requirements</h2>
              <p>
                Fill out the details below for an accurate quote tailored to
                your needs.
              </p>
            </div>

            {submitStatus === "success" && (
              <div
                className={styles.successMessage}
                role="alert"
                aria-live="polite"
              >
                <svg
                  className={styles.successIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>
                  Quote request submitted successfully! We&apos;ll contact you
                  within 24 hours with pricing.
                </span>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                className={styles.errorMessage}
                role="alert"
                aria-live="assertive"
              >
                <svg
                  className={styles.errorIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>
                  Error submitting quote request. Please try again or contact us
                  directly.
                </span>
              </div>
            )}

            {/* <form
              action="/api/request-a-quote"
              method="post"
              className={styles.form}
              noValidate
            > */}
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {/* Contact Information */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Contact Information</legend>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.fullName ? styles.inputError : ""
                      }`}
                      placeholder="Enter your full name"
                      required
                      aria-required="true"
                      aria-invalid={errors.fullName ? "true" : "false"}
                      autoComplete="name"
                      aria-describedby={
                        errors.fullName ? "fullName-error" : undefined
                      }
                    />
                    {errors.fullName && (
                      <span
                        id="fullName-error"
                        className={styles.errorText}
                        role="alert"
                      >
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="companyName" className={styles.label}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={styles.input}
                      autoComplete="organization"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.email ? styles.inputError : ""
                      }`}
                      placeholder="your.email@company.com"
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : "false"}
                      autoComplete="email"
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <span
                        id="email-error"
                        className={styles.errorText}
                        role="alert"
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.phone ? styles.inputError : ""
                      }`}
                      placeholder="(000) 000-0000"
                      required
                      aria-required="true"
                      aria-invalid={errors.phone ? "true" : "false"}
                      autoComplete="tel"
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <span
                        id="phone-error"
                        className={styles.errorText}
                        role="alert"
                      >
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Quote Details */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Pallet Specifications</legend>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="palletType" className={styles.label}>
                      Pallet Type *
                    </label>
                    <select
                      id="palletType"
                      name="palletType"
                      value={formData.palletType}
                      onChange={handleInputChange}
                      className={`${styles.select} ${
                        errors.palletType ? styles.inputError : ""
                      }`}
                      required
                      aria-required="true"
                      aria-invalid={errors.palletType ? "true" : "false"}
                      aria-describedby={
                        errors.palletType ? "palletType-error" : undefined
                      }
                    >
                      <option value="">Select pallet type</option>
                      <option value="STANDARD">Standard Pallets</option>
                      <option value="RECYCLED">Recycled Pallets</option>
                      <option value="CUSTOM">Custom Pallets</option>
                    </select>
                    {errors.palletType && (
                      <span
                        id="palletType-error"
                        className={styles.errorText}
                        role="alert"
                      >
                        {errors.palletType}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="quantity" className={styles.label}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.quantity ? styles.inputError : ""
                      }`}
                      placeholder="100"
                      min="1"
                      required
                      aria-required="true"
                      aria-invalid={errors.quantity ? "true" : "false"}
                      aria-describedby={
                        errors.quantity ? "quantity-error" : undefined
                      }
                    />
                    {errors.quantity && (
                      <span
                        id="quantity-error"
                        className={styles.errorText}
                        role="alert"
                      >
                        {errors.quantity}
                      </span>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Delivery Address */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Delivery Information</legend>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="street" className={styles.label}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      className={styles.input}
                      autoComplete="street-address"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="city" className={styles.label}>
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className={styles.input}
                      autoComplete="address-level2"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="state" className={styles.label}>
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className={styles.select}
                      autoComplete="address-level1"
                    >
                      <option value="AL">Alabama</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="zipCode" className={styles.label}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.address.zipCode}
                      onChange={handleInputChange}
                      className={styles.input}
                      autoComplete="postal-code"
                      pattern="[0-9]{5}(-[0-9]{4})?"
                      aria-describedby="zipCode-hint"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Additional Details */}
              <div className={styles.formGroup}>
                <label htmlFor="comments" className={styles.label}>
                  Additional Requirements or Comments
                </label>
                <textarea
                  id="comments"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  placeholder="Please provide details about your pallet requirements, quantities, specifications, or any questions you have."
                  rows="4"
                  aria-describedby="comments-hint"
                />
                <span id="comments-hint" className="sr-only">
                  Optional: Provide any specific requirements or questions
                </span>
              </div>

              <div className={styles.formActions}>
                {/* <button type="submit" ariaLabel="Submit quote request form">
                  Submit
                </button> */}
                <Button
                  text={isSubmitting ? "Submitting..." : "Submit Quote Request"}
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  ariaLabel="Submit quote request form"
                />
              </div>
            </form>
          </div>

          {/* Quote Information Sidebar */}
          <aside
            className={styles.infoSection}
            aria-label="Quote process information"
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Quote Process</h3>
              <ol className={styles.processSteps} role="list">
                <li className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Submit Request</h4>
                    <p>Fill out the form with your requirements</p>
                  </div>
                </li>
                <li className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Review & Analysis</h4>
                    <p>We analyze your needs and prepare pricing</p>
                  </div>
                </li>
                <li className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Receive Quote</h4>
                    <p>Get your detailed quote within 24 hours</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>What We Need to Know</h3>
              <ul className={styles.requirementsList} role="list">
                <li className={styles.requirement}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Pallet type and specifications</span>
                </li>
                <li className={styles.requirement}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Quantity needed</span>
                </li>
                <li className={styles.requirement}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Delivery location</span>
                </li>
                <li className={styles.requirement}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Timeline requirements</span>
                </li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Need Help?</h3>
              <p className={styles.helpText}>
                Not sure about specifications? Our team can help you determine
                the right pallet solution.
              </p>
              <div className={styles.helpActions}>
                <Button
                  text="Call Us"
                  variant="outline"
                  onClick={() => (window.location.href = "tel:+14695551234")}
                  ariaLabel="Call QS Pallets for assistance"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
