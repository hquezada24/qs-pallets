"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import styles from "@/styles/ContactPage.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        console.log(
          "Attempting to fetch from:",
          process.env.NEXT_PUBLIC_API_URL
        );

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch contact data");
        }
        setData(await res.json());
      } catch (error) {
        console.error("Something went wrong: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Make the API call
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the actual formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // send the data to backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className={styles.contentWrapper}>
        <div className={styles.loading}>Loading ...</div>;
      </div>
    );
  if (error)
    return (
      <div className={styles.contentWrapper}>
        <div className={styles.error}>Something went wrong</div>;
      </div>
    );

  return (
    <div className={styles.contactPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Get In Touch</h1>
          <p className={styles.subtitle}>
            Ready to discuss your pallet needs? We&apos;re here to help with
            custom solutions and reliable supply.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Contact Form */}
          <section
            className={styles.formSection}
            role="form"
            aria-labelledby="contact-form-heading"
          >
            <div className={styles.formHeader}>
              <h2 id="contact-form-heading">Send Us a Message</h2>
              <p>
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
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
                  Thank you! Your message has been sent successfully. We&apos;ll
                  contact you soon.
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
                  Sorry, there was an error sending your message. Please try
                  again or contact us directly.
                </span>
              </div>
            )}

            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-describedby="contact-form-heading"
            >
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  placeholder="Enter your full name"
                  required
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span
                    id="name-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.name}
                  </span>
                )}
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
                    aria-describedby={errors.email ? "email-error" : undefined}
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
                    aria-describedby={errors.phone ? "phone-error" : undefined}
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.label}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.subject ? styles.inputError : ""
                  }`}
                  placeholder="Brief description of your inquiry"
                  required
                  aria-describedby={
                    errors.subject ? "subject-error" : undefined
                  }
                />
                {errors.subject && (
                  <span
                    id="subject-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${styles.textarea} ${
                    errors.message ? styles.inputError : ""
                  }`}
                  placeholder="Please provide details about your pallet requirements, quantities, specifications, or any questions you have."
                  rows="6"
                  required
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <span
                    id="message-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              <div className={styles.formActions}>
                <Button
                  text={isSubmitting ? "Sending..." : "Send Message"}
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  aria-label="Submit contact form"
                />
              </div>
            </form>
          </section>

          {/* Contact Information */}
          <aside
            className={styles.infoSection}
            aria-label="Company contact information"
          >
            <div
              className={styles.infoCard}
              role="region"
              aria-labelledby="info-heading"
            >
              <h3 id="info-heading" className={styles.infoTitle}>
                Contact Information
              </h3>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h4>Our Location</h4>
                  <address>
                    <p>{data.address.street}</p>
                    <p>
                      {data.address.city}, {data.address.state}{" "}
                      {data.address.zipCode}
                    </p>
                  </address>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h4>Phone</h4>
                  <p>
                    <a
                      aria-label={`Call us at ${data.phone.display}`}
                      href={data.phone.href}
                      className={styles.contactLink}
                    >
                      {data.phone.display}
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h4>Email</h4>
                  <p>
                    <a
                      href={data.email.href}
                      className={styles.contactLink}
                      aria-label={`Email us at ${data.email.display}`}
                    >
                      {data.email.display}
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h4>Business Hours</h4>
                  <p>{data.businessHours.weekdays}</p>
                  <p>{data.businessHours.saturday}</p>
                  <p>{data.businessHours.sunday}</p>
                </div>
              </div>
            </div>

            <div
              className={styles.infoCard}
              role="region"
              aria-labelledby="why-choose-heading"
            >
              <h3 id="why-choose-heading" className={styles.infoTitle}>
                Why Choose QS Pallets?
              </h3>
              <ul className={styles.benefitsList}>
                {[
                  "Fast turnaround times",
                  "Custom pallet solutions",
                  "Competitive pricing",
                  "Quality materials",
                  "Reliable delivery",
                ].map((benefit, i) => (
                  <li key={i} className={styles.benefit}>
                    <svg
                      className={styles.checkIcon}
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={styles.infoCard}
              role="region"
              aria-labelledby="urgent-heading"
            >
              <h3 id="urgent-heading" className={styles.infoTitle}>
                Need Immediate Help?
              </h3>
              <p className={styles.urgentText}>
                For urgent inquiries or large orders, call us directly at{" "}
                <a
                  href="tel:+19034010536"
                  className={styles.phoneLink}
                  aria-label="Call QS Pallets at (903) 401-0536"
                >
                  (903) 401-0536
                </a>
              </p>
              <div className={styles.urgentActions}>
                <Button
                  text="Call Now"
                  variant="outline"
                  onClick={() => (window.location.href = "tel:+9034010536")}
                  aria-label="Call QS Pallets now"
                />
                <Button
                  text="Get Quote"
                  variant="secondary"
                  onClick={() => (window.location.href = "/request-a-quote")}
                  aria-label="Request a pallet quote"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Contact;
