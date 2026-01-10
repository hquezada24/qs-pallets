"use client";
import Button from "./Button";
import Image from "next/image";
import styles from "@/styles/ProductCard.module.css";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle both single image (string) and multiple images (array)
  const images = Array.isArray(product.imageURL)
    ? product.imageURL
    : product.imageURL
    ? [product.imageURL]
    : ["/images/placeholder.jpeg"]; // fallback image

  const isSingleImage = images.length === 1;
  const currentImageURL = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div
      className={styles.productCard}
      role="article"
      aria-labelledby={`product-${product.name}-title`}
    >
      <div className={styles.productHeader}>
        {/* Product Title */}
        <div className={styles.productTitle}>
          <h3 id={`product-${product.name}-title`}>{product.name}</h3>
        </div>

        {/* Product Price */}
        {product.price && (
          <p
            className={styles.productPrice}
            aria-label={`Price: ${product.price}`}
          >
            {parseInt(product.price) ? `$${product.price}` : product.price}
          </p>
        )}
        {/* Product Image Container */}
        {product.imageURL ? (
          <div className={styles.imageContainer}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={currentImageURL}
              alt={`${product.name} - Image ${currentIndex + 1} of ${
                images.length
              }`}
              className={styles.productImage}
            />

            {/* Carousel Controls - Only show if multiple images */}
            {!isSingleImage && (
              <>
                <button
                  onClick={prevImage}
                  className={styles.carouselBtn}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className={styles.carouselBtn}
                  aria-label="Next image"
                >
                  ›
                </button>
                <div className={styles.imageIndicators}>
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.indicator} ${
                        index === currentIndex ? styles.active : ""
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      role="button"
                      aria-label={`View image ${index + 1}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setCurrentIndex(index);
                        }
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Product Description */}
      <div className={styles.productDescription}>
        <p>{product.description}</p>
      </div>

      {/* Features */}
      {product.key_features?.length > 0 && (
        <div className={styles.productFeatures}>
          <h4>Key Features</h4>
          <ul>
            {product.key_features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className={styles.productActions}>
        <Button
          text="Get Quote"
          link="/request-a-quote"
          aria-label={`Get a quote for ${product.name}`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
