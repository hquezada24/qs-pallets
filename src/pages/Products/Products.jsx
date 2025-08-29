import styles from "./Styles.module.css";
import { Product } from "./components/Products/Product";

const Products = () => {
  const products = [
    {
      id: 1,
      title: "New Pallets",
      subtitle: "Premium Quality Construction",
      description:
        "Our new pallets are crafted from high-grade materials with precision manufacturing processes. Built to withstand heavy loads and repeated use, these pallets offer maximum durability and reliability for your shipping needs.",
      features: [
        "Heat-treated lumber meeting ISPM 15 standards",
        "Load capacity up to 4,800 lbs",
        'Standard sizes: 48" x 40", 42" x 42", 48" x 48"',
        "Kiln-dried wood for consistency",
        "Custom branding available",
      ],
      applications: [
        "Food & Beverage",
        "Pharmaceutical",
        "Electronics",
        "Automotive",
      ],
      price: "Starting at $45",
      image: "🆕",
      accent: "primary",
    },
    {
      id: 2,
      title: "Recycled Pallets",
      subtitle: "Sustainable & Cost-Effective",
      description:
        "Our recycled pallets undergo rigorous inspection and refurbishment processes. Each pallet is carefully selected, repaired, and tested to ensure it meets our quality standards while providing an environmentally conscious solution.",
      features: [
        "Thoroughly inspected and graded",
        "Structural repairs using quality materials",
        "Load tested for safety assurance",
        "Various grades available (A, B, C)",
        "Immediate availability in large quantities",
      ],
      applications: [
        "General Shipping",
        "Warehouse Storage",
        "Distribution Centers",
        "Manufacturing",
      ],
      price: "Starting at $18",
      image: "♻️",
      accent: "secondary",
    },
    {
      id: 3,
      title: "Custom Pallets",
      subtitle: "Tailored to Your Specifications",
      description:
        "When standard sizes won't work, our custom pallet solutions are designed specifically for your unique requirements. From unusual dimensions to specialized materials, we create pallets that perfectly fit your products and processes.",
      features: [
        "Any size or dimension possible",
        "Multiple wood species available",
        "Specialized treatments and coatings",
        "Export compliance certifications",
        "Engineering support included",
      ],
      applications: [
        "Heavy Machinery",
        "Oversized Products",
        "International Shipping",
        "Special Industries",
      ],
      price: "Quote on Request",
      image: "🔧",
      accent: "tertiary",
    },
  ];

  return (
    <div className={styles.products}>
      <div className={styles.hero}>
        <h1>Our Products</h1>
        <p className={styles.subtitle}>
          Comprehensive pallet solutions designed to meet every shipping and
          storage need
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.intro}>
          <h2>Quality Pallets for Every Need</h2>
          <p>
            At QS Pallets, we understand that different industries and
            applications require different pallet solutions. That's why we offer
            a comprehensive range of products, from cost-effective recycled
            options to premium custom-built pallets. Every product in our lineup
            is backed by our commitment to quality, reliability, and customer
            satisfaction.
          </p>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              subtitle={product.subtitle}
              description={product.description}
              features={product.features}
              applications={product.applications}
              price={product.price}
              image={product.image}
              accent={product.accent}
            />
          ))}
        </div>

        <div className={styles.additionalServices}>
          <h2>Additional Services</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🚚</div>
              <h3>Delivery Services</h3>
              <p>
                Fast, reliable delivery throughout the region. We work with
                trusted logistics partners to ensure your pallets arrive on time
                and in perfect condition.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🔄</div>
              <h3>Pallet Management</h3>
              <p>
                Complete pallet lifecycle management including pickup, repair,
                and exchange programs to keep your operations running smoothly.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>📊</div>
              <h3>Inventory Solutions</h3>
              <p>
                Strategic inventory management and just-in-time delivery
                programs designed to optimize your supply chain and reduce
                storage costs.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🌱</div>
              <h3>Sustainability Programs</h3>
              <p>
                Eco-friendly disposal and recycling services that help reduce
                your environmental impact while recovering value from used
                pallets.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.specifications}>
          <h2>Standard Specifications</h2>
          <div className={styles.specTable}>
            <div className={styles.specHeader}>
              <div>Specification</div>
              <div>New Pallets</div>
              <div>Recycled Pallets</div>
              <div>Custom Pallets</div>
            </div>
            <div className={styles.specRow}>
              <div>Load Capacity</div>
              <div>Up to 4,800 lbs</div>
              <div>Up to 3,500 lbs</div>
              <div>Engineered to spec</div>
            </div>
            <div className={styles.specRow}>
              <div>Standard Sizes</div>
              <div>48"×40", 42"×42", 48"×48"</div>
              <div>Various standard sizes</div>
              <div>Any dimension</div>
            </div>
            <div className={styles.specRow}>
              <div>Wood Treatment</div>
              <div>Heat treated, kiln dried</div>
              <div>Varies by grade</div>
              <div>Per requirements</div>
            </div>
            <div className={styles.specRow}>
              <div>Lead Time</div>
              <div>5-10 business days</div>
              <div>Same day - 3 days</div>
              <div>2-4 weeks</div>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Ready to Find Your Perfect Pallet Solution?</h2>
            <p>
              Our team is here to help you choose the right products for your
              specific needs.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>Request a Quote</button>
              <button className={styles.secondaryButton}>
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Products };
