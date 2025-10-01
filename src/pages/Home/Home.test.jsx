// Home.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import * as useHomeDataModule from "../../hooks/useHomeData";

// Mock the custom hook module
vi.mock("../../hooks/useHomeData");

// Mock ScrollRestoration from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ScrollRestoration: () => null,
  };
});

// Mock child components
vi.mock("./Components/Hero/Hero", () => ({
  Hero: () => <div data-testid="hero">Hero Component</div>,
}));

vi.mock("./Components/FeaturedProducts/FeaturedProducts", () => ({
  FeaturedProducts: ({ products }) => (
    <div data-testid="featured-products">
      Featured Products: {products?.length || 0}
    </div>
  ),
}));

vi.mock("./Components/WhyChooseUs/WhyChooseUs", () => ({
  WhyChooseUs: ({ features }) => (
    <div data-testid="why-choose-us">
      Why Choose Us: {features?.length || 0}
    </div>
  ),
}));

vi.mock("./Components/CallToAction/CallToAction", () => ({
  CallToAction: () => <div data-testid="cta">Call to Action</div>,
}));

// Wrapper component for Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.spyOn(useHomeDataModule, "useHomeData").mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderWithRouter(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("hero")).not.toBeInTheDocument();
  });

  it("renders error state", () => {
    const errorMessage = "Failed to fetch data";
    vi.spyOn(useHomeDataModule, "useHomeData").mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage,
    });

    renderWithRouter(<Home />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByTestId("hero")).not.toBeInTheDocument();
  });

  it("renders all components when data is loaded successfully", () => {
    const mockData = {
      features: [{ id: 1, name: "Product 1" }],
      whyChooseUs: [{ id: 1, title: "Feature 1" }],
    };

    vi.spyOn(useHomeDataModule, "useHomeData").mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    const { container } = renderWithRouter(<Home />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("featured-products")).toBeInTheDocument();
    expect(screen.getByTestId("why-choose-us")).toBeInTheDocument();
    expect(screen.getByTestId("cta")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("passes correct props to FeaturedProducts", () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];

    vi.spyOn(useHomeDataModule, "useHomeData").mockReturnValue({
      data: { features: mockProducts, whyChooseUs: [] },
      loading: false,
      error: null,
    });

    renderWithRouter(<Home />);

    expect(screen.getByText("Featured Products: 2")).toBeInTheDocument();
  });

  it("passes correct props to WhyChooseUs", () => {
    const mockFeatures = [
      { id: 1, title: "Feature 1" },
      { id: 2, title: "Feature 2" },
      { id: 3, title: "Feature 3" },
    ];

    vi.spyOn(useHomeDataModule, "useHomeData").mockReturnValue({
      data: { features: [], whyChooseUs: mockFeatures },
      loading: false,
      error: null,
    });

    renderWithRouter(<Home />);

    expect(screen.getByText("Why Choose Us: 3")).toBeInTheDocument();
  });

  it("handles undefined data gracefully", () => {
    vi.spyOn(useHomeDataModule, "useHomeData").mockReturnValue({
      data: undefined,
      loading: false,
      error: null,
    });

    renderWithRouter(<Home />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("featured-products")).toBeInTheDocument();
    expect(screen.getByText("Featured Products: 0")).toBeInTheDocument();
  });

  it("renders successfully", () => {
    const { container } = renderWithRouter(<Home />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
