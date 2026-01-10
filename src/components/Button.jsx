"use client";
import styles from "@/styles/Button.module.css";
import Link from "next/link";

const Button = ({
  text,
  link = "",
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  ariaLabel,
  className = "",
  ...props
}) => {
  const buttonClass = [
    styles.btn,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      className={buttonClass}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel || text}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {link ? (
        <Link
          href={link}
          className={`btnLink ${loading ? styles.textHidden : ""}`}
        >
          {text}
        </Link>
      ) : (
        <span className={loading ? styles.textHidden : ""}>{text}</span>
      )}
    </button>
  );
};

export default Button;
