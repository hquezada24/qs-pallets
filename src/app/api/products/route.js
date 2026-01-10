// GET /api/products
export const GET = (request) => {
  return new Response(
    JSON.stringify({
      title: "Our Product Range",
      description:
        "From standard shipping pallets to custom solutions, we have the right pallet for every application and budget.",
      products: [
        {
          name: "Standard Pallets",
          imageURL: ["/pallet1.jpeg", "/pallet2.jpeg"],
          icon: "🆕",
          price: 11,
          index_page_description:
            "Premium quality pallets built from high-grade materials. Perfect for applications requiring maximum durability and consistency.",
          description:
            "Our new pallets are crafted from high-grade materials with precision manufacturing processes. Built to withstand heavy loads and repeated use, these pallets offer maximum durability and reliability for your shipping needs.",
          key_features: [
            "High load capacity",
            'Standard sizes: 48" x 40", 42" x 42", 48" x 48"',
            "Custom branding available",
          ],
        },
        {
          name: "Recycled Pallets",
          icon: "♻️",
          price: "5",
          index_page_description:
            "Cost-effective and environmentally responsible. Our recycled pallets are thoroughly inspected and refurbished to meet quality standards.",
          description:
            "Our recycled pallets undergo rigorous inspection and refurbishment processes. Each pallet is carefully selected, repaired, and tested to ensure it meets our quality standards while providing an environmentally conscious solution.",
          key_features: [
            "Thoroughly inspected and graded",
            "Structural repairs using quality materials",
            "Load tested for safety assurance",
          ],
        },
        {
          name: "Custom Pallets",
          icon: "🔧",
          price: "Quote on request",
          index_page_description:
            "Specialized solutions for unique requirements. Any size, any specification - we'll create the perfect pallet for your needs.",
          description:
            "When standard sizes won't work, our custom pallet solutions are designed specifically for your unique requirements. From unusual dimensions to specialized materials, we create pallets that perfectly fit your products and processes.",
          key_features: [
            "Any size or dimension possible",
            "Custom branding available",
            "Load tested for safety assurance",
          ],
        },
      ],
      additionalServices: [
        {
          icon: "🔄",
          title: "Pallet Management",
          description:
            "Complete pallet lifecycle management including pickup, repair, and exchange programs to keep your operations running smoothly.",
        },
        {
          icon: "📊",
          title: "Inventory Solutions",
          description:
            "Strategic inventory management and just-in-time delivery programs designed to optimize your supply chain and reduce storage costs.",
        },
        {
          icon: "🌱",
          title: "Sustainability",
          description:
            "Eco-friendly disposal and recycling services that help reduce your environmental impact while recovering value from used pallets.",
        },
      ],
      specifications: {
        headers: [
          "Specification",
          "New Pallets",
          "Recycled Pallets",
          "Custom Pallets",
        ],
        rows: [
          [
            "Standard Sizes",
            '48"×40", 42"×42", 48" U+00d7 48"',
            "Various standard sizes",
            "Any dimension",
          ],
          ["Lead Time", "5-10 business days", "Same day - 3 days", "2-4 weeks"],
        ],
      },
    }),
    { status: 200 }
  );
};
