"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "@/styles/QuoteForm.module.css";
import { apiRequest } from "@/lib/apiRequest";
import ProductsSkeleton from "@/components/ProductsSkeleton";

type QuoteItem = {
  id: string;
  name: string;
  price?: number;
  quantity: number;
};

type Product = {
  _id: string;
  name: string;
  icon: string;
  price?: number;
  isCustom: boolean;
};

type Errors = {
  fullName?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  quantities?: string;
};

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "AR",
      zipCode: "",
    },
    additionalDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState<Errors>({});
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [quantities, setQuantities] = useState<Product[]>([]);
  const customProduct = products?.products.find((p) => p.isCustom);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const showCustomSection = customProduct
    ? (items.find((i) => i.id === customProduct._id)?.quantity || 0) > 0
    : false;

  const [customDimensions, setCustomDimensions] = useState({
    length: "",
    width: "",
    height: "",
    weightCapacity: "",
    notes: "",
  });

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setCustomDimensions((prev) => ({ ...prev, [name]: value }));
  };

  // Handler para actualizar cantidad por productId
  const handleQuantityChange = (product: Product, value: number) => {
    const clamped = Math.max(0, value);

    setItems((prev) => {
      const exists = prev.find((i) => i.id === product._id);

      // Si quantity llega a 0, lo removemos del array
      if (clamped === 0) {
        return prev.filter((i) => i.id !== product._id);
      }

      // Si ya existe, solo actualizamos quantity
      if (exists) {
        return prev.map((i) =>
          i.id === product._id ? { ...i, quantity: clamped } : i,
        );
      }

      // Si no existe, lo agregamos con todos sus datos
      return [
        ...prev,
        {
          id: product._id,
          name: product.name,
          ...(product.price !== null && { price: product.price }),
          quantity: clamped,
        },
      ];
    });
  };

  const validateForm = () => {
    const newErrors: Errors = {};

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

    if (items.length === 0) {
      newErrors.quantities = "Please select at least one product";
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

      const response = await fetch("/api/request-a-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items,
          ...(showCustomSection && { customDimensions }),
        }),
      });

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
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
        additionalDetails: "",
      });
      setItems([]);
      setCustomDimensions({
        length: "",
        width: "",
        height: "",
        weightCapacity: "",
        notes: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Quote submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await apiRequest("/api/our-products");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error("Product fetching error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    if (!submitStatus) return;

    const delay = 5000;
    const timer = setTimeout(() => {
      setSubmitStatus(null);
    }, delay);

    return () => clearTimeout(timer);
  }, [submitStatus]);

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

                {loading ? (
                  <ProductsSkeleton />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {products.products.map((item) => {
                      const currentQty =
                        items.find((i) => i.id === item._id)?.quantity || 0;
                      return (
                        <div
                          key={item._id}
                          className="flex items-center justify-between gap-4 bg-white border-2 border-[#e2e8f0] rounded-lg px-4 py-3 hover:border-[#32cd32] transition-colors duration-200 focus-within:border-[#228b22] focus-within:shadow-[0_0_0_3px_rgba(34,139,34,0.1)]"
                        >
                          {/* Product info */}
                          <div className="flex items-center gap-2 min-w-0">
                            {item.icon && (
                              <span className="text-xl shrink-0">
                                {item.icon}
                              </span>
                            )}
                            <div className="min-w-0">
                              <p className="text-[#2d3748] font-semibold text-sm leading-tight truncate">
                                {item.name}
                              </p>
                              {item.price && (
                                <p className="text-[#718096] text-xs mt-0.5">
                                  ${item.price} / unit
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() =>
                                handleQuantityChange(item, currentQty - 1)
                              }
                              disabled={currentQty === 0}
                              className="w-7 h-7 rounded-md border-2 border-[#e2e8f0] text-[#718096] font-bold text-base leading-none flex items-center justify-center hover:border-[#228b22] hover:text-[#228b22] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={currentQty}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item,
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              name={`quantity_${item._id}`}
                              aria-label={`Quantity for ${item.name}`}
                              className="w-12 text-center text-sm font-semibold text-[#2d3748] border-2 border-[#e2e8f0] rounded-md py-1 px-1 focus:outline-none focus:border-[#228b22] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(item, currentQty + 1)
                              }
                              aria-label={`Increase quantity of ${item.name}`}
                              className="w-7 h-7 rounded-md border-2 border-[#e2e8f0] text-[#718096] font-bold text-base leading-none flex items-center justify-center hover:border-[#228b22] hover:text-[#228b22] transition-colors"
                            >
                              ＋
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {errors.quantities && (
                  <span className="text-[#e53e3e] text-sm font-medium mt-1 block">
                    {errors.quantities}
                  </span>
                )}
                {showCustomSection && (
                  <div className="mt-4 p-4 bg-white border-2 border-[#e2e8f0] rounded-lg shadow-[0_0_0_3px_rgba(34,139,34,0.08)] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#228b22]">📐</span>
                      <h4 className="text-[#2d3748] font-semibold text-sm">
                        Custom Pallet Dimensions
                      </h4>
                    </div>

                    {/* Medidas principales */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {[
                        { name: "length", label: "Length (in)" },
                        { name: "width", label: "Width (in)" },
                        { name: "height", label: "Height (in)" },
                      ].map(({ name, label }) => (
                        <div key={name} className="flex flex-col gap-1">
                          <label
                            htmlFor={`dim_${name}`}
                            className="text-[#2d3748] font-semibold text-xs"
                          >
                            {label}
                          </label>
                          <input
                            type="number"
                            id={`dim_${name}`}
                            name={name}
                            min="1"
                            value={customDimensions[name]}
                            onChange={handleDimensionChange}
                            placeholder="0"
                            className="text-sm text-center border-2 border-[#e2e8f0] rounded-md py-1.5 px-2 focus:outline-none focus:border-[#228b22] focus:shadow-[0_0_0_3px_rgba(34,139,34,0.1)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Capacidad de peso */}
                    <div className="flex flex-col gap-1 mb-3">
                      <label
                        htmlFor="dim_weightCapacity"
                        className="text-[#2d3748] font-semibold text-xs"
                      >
                        Weight Capacity (lbs)
                      </label>
                      <input
                        type="number"
                        id="dim_weightCapacity"
                        name="weightCapacity"
                        min="1"
                        value={customDimensions.weightCapacity}
                        onChange={handleDimensionChange}
                        placeholder="e.g. 2000"
                        className="text-sm border-2 border-[#e2e8f0] rounded-md py-1.5 px-3 focus:outline-none focus:border-[#228b22] focus:shadow-[0_0_0_3px_rgba(34,139,34,0.1)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    {/* Notas adicionales del custom */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="dim_notes"
                        className="text-[#2d3748] font-semibold text-xs"
                      >
                        Additional Specifications
                      </label>
                      <textarea
                        id="dim_notes"
                        name="notes"
                        rows={2}
                        value={customDimensions.notes}
                        onChange={handleDimensionChange}
                        placeholder="Wood type, notch placement, special treatments..."
                        className="text-sm border-2 border-[#e2e8f0] rounded-md py-1.5 px-3 resize-none focus:outline-none focus:border-[#228b22] focus:shadow-[0_0_0_3px_rgba(34,139,34,0.1)]"
                      />
                    </div>
                  </div>
                )}
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
                      <option value="AR">Arkansas</option>
                      <option value="OK">Oklahoma</option>
                      <option value="TX">Texas</option>
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
                  rows={4}
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
