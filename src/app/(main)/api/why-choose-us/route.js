// GET /api/why-choose-us
export const GET = (request) => {
  return new Response(
    JSON.stringify({
      title: "Why Choose QS Pallets?",
      description:
        "We're not just another pallet supplier. We're your logistics partner, committed to providing solutions that keep your business moving forward.",
      features: [
        {
          icon: "⚡",
          title: "Custom Solutions",
          description:
            "Standard sizes not working? We create custom pallets tailored to your exact specifications, no matter how unique your requirements.",
        },
        {
          icon: "🔧",
          title: "Competitive Pricing",
          description:
            "Get the best value for your investment. Our efficient operations allow us to offer competitive prices without sacrificing quality.",
        },
        {
          icon: "💰",
          title: "Trusted Partnership",
          description:
            "We build lasting relationships with our clients. Count on us for reliable service, clear communication, and expert support.",
        },
      ],
    }),
    { status: 200 }
  );
};
