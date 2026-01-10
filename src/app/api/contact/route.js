// GET /api/contact
export const GET = (request) => {
  return new Response(
    JSON.stringify({
      address: {
        street: "1415 FM 2216",
        city: "Honey Grove",
        state: "TX",
        zipCode: "75446",
        formatted: "1415 FM 2216\nHoney Grove, TX 75446",
      },
      phone: {
        display: "(903) 401-0536",
        href: "tel:+19034010536",
      },
      email: {
        display: "info@qspallets.com",
        href: "mailto:info@qspallets.com",
      },
      businessHours: {
        weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
        saturday: "Saturday: 8:00 AM - 4:00 PM",
        sunday: "Sunday: Closed",
      },
    }),
    { status: 200 }
  );
};
