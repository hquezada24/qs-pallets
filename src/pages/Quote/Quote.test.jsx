// Quote.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Quote } from "./Quote";

// Mock ScrollRestoration from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ScrollRestoration: () => null,
  };
});

// Mock quote form component
vi.mock("../../components/forms/QuoteForm", () => ({
  default: () => <div data-testid="quote-form">QuoteForm</div>,
}));

// Wrapper component for Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Quote component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders quote form component", () => {
    const { container } = renderWithRouter(<Quote />);

    expect(screen.getByTestId("quote-form")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot", () => {
    const { container } = renderWithRouter(<Quote />);
    expect(container).toMatchSnapshot();
  });
});
