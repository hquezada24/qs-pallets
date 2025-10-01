// Home.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Products } from "./Products";
import * as useProductsDataModule from "../../hooks/useProductsData";
import { Product } from "./components/Products/Product";

// Mock the custom hook module
vi.mock("../../hooks/useProductsData");

// Mock ScrollRestoration from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ScrollRestoration: () => null,
  };
});

// Mock Product component
vi.mock("./components/Products/Product", () => ({
  Product: ({ product }) => (
    <div
      data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, "-")}`}
      data-product-name={product.name}
      data-product-price={product.price}
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div data-testid="product-features">
        {product.key_features?.map((feature, idx) => (
          <span key={idx}>{feature}</span>
        ))}
      </div>
    </div>
  ),
}));

// Wrapper component for Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Products component", () => {
  const mockProductsData = {
    products: [
      {
        name: "New Wood Pallets",
        price: "$15-$25",
        description:
          "Brand new, custom-built pallets made from high-quality lumber.",
        key_features: [
          "Custom sizes available",
          "Premium materials",
          "ISPM 15 certified",
        ],
      },
      {
        name: "Recycled Pallets",
        price: "$8-$15",
        description: "Cost-effective recycled pallets in good condition.",
        key_features: ["Eco-friendly", "Budget-friendly", "Various sizes"],
      },
    ],
    additionalServices: [
      {
        icon: "🚚",
        title: "Delivery Service",
        description: "Fast and reliable delivery to your location.",
      },
      {
        icon: "🔧",
        title: "Pallet Repair",
        description: "Professional repair services for damaged pallets.",
      },
    ],
    specifications: {
      headers: ["Type", "Size", "Weight Capacity", "Material"],
      rows: [
        ["Standard", "48x40", "2,500 lbs", "Oak/Pine"],
        ["Heavy Duty", "48x48", "4,500 lbs", "Hardwood"],
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderWithRouter(<Products />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Our Products")).not.toBeInTheDocument();
  });

  it("renders error state", () => {
    const errorMessage = "Failed to fetch products";
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage,
    });

    renderWithRouter(<Products />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByText("Our Products")).not.toBeInTheDocument();
  });

  it("renders all products when data is loaded successfully", () => {
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: mockProductsData,
      loading: false,
      error: null,
    });

    renderWithRouter(<Products />);

    // Check hero section
    expect(screen.getByText("Our Products")).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive pallet solutions/i)
    ).toBeInTheDocument();

    // Check products are rendered
    expect(screen.getByTestId("product-new-wood-pallets")).toBeInTheDocument();
    expect(screen.getByTestId("product-recycled-pallets")).toBeInTheDocument();

    // Verify product content
    expect(screen.getByText("New Wood Pallets")).toBeInTheDocument();
    expect(screen.getByText("Recycled Pallets")).toBeInTheDocument();
  });

  it("renders additional services section", () => {
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: mockProductsData,
      loading: false,
      error: null,
    });

    renderWithRouter(<Products />);

    expect(screen.getByText("Additional Services")).toBeInTheDocument();
    expect(screen.getByText("Delivery Service")).toBeInTheDocument();
    expect(screen.getByText("Pallet Repair")).toBeInTheDocument();
  });

  it("renders specifications table", () => {
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: mockProductsData,
      loading: false,
      error: null,
    });

    renderWithRouter(<Products />);

    expect(screen.getByText("Standard Specifications")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();
    expect(screen.getByText("Weight Capacity")).toBeInTheDocument();
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Heavy Duty")).toBeInTheDocument();
  });

  it("renders CTA section with links", () => {
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: mockProductsData,
      loading: false,
      error: null,
    });

    renderWithRouter(<Products />);

    expect(
      screen.getByText(/Ready to Find Your Perfect Pallet Solution/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Request a Quote")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("handles empty products array gracefully", () => {
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: { ...mockProductsData, products: [] },
      loading: false,
      error: null,
    });

    renderWithRouter(<Products />);

    expect(screen.getByText("Our Products")).toBeInTheDocument();
    expect(screen.queryByTestId(/^product-/)).not.toBeInTheDocument();
  });

  it("handles missing optional data gracefully", () => {
    vi.spyOn(useProductsDataModule, "useProductsData").mockReturnValue({
      data: {
        products: mockProductsData.products,
        // Missing additionalServices and specifications
      },
      loading: false,
      error: null,
    });

    renderWithRouter(<Products />);

    expect(screen.getByText("Our Products")).toBeInTheDocument();
    // Component should still render without crashing
  });
});
