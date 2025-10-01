// About.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { About } from "./About";

// Mock ScrollRestoration
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ScrollRestoration: () => null,
  };
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("About component", () => {
  it("renders the hero section", () => {
    renderWithRouter(<About />);

    expect(screen.getByText("About QS Pallets")).toBeInTheDocument();
    expect(
      screen.getByText(/Your trusted partner in supply chain solutions/i)
    ).toBeInTheDocument();
  });

  it("renders all main sections", () => {
    renderWithRouter(<About />);

    expect(screen.getByText("Our Mission")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(screen.getByText("Our Products")).toBeInTheDocument();
    expect(screen.getByText("Why Choose QS Pallets")).toBeInTheDocument();
  });

  it("renders product cards", () => {
    renderWithRouter(<About />);

    expect(screen.getByText("New Pallets")).toBeInTheDocument();
    expect(screen.getByText("Recycled Pallets")).toBeInTheDocument();
    expect(screen.getByText("Custom Pallets")).toBeInTheDocument();
  });

  it("renders reason cards", () => {
    renderWithRouter(<About />);

    expect(screen.getByText("Quality You Can Trust")).toBeInTheDocument();
    expect(screen.getByText("Commitment to Service")).toBeInTheDocument();
    expect(screen.getByText("Fast & Reliable Delivery")).toBeInTheDocument();
  });

  it("renders CTA section with link", () => {
    renderWithRouter(<About />);

    expect(screen.getByText("Ready to Partner with Us?")).toBeInTheDocument();
    expect(screen.getByText("Get Your Quote Today")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = renderWithRouter(<About />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
