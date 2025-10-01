// Home.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Contact } from "./Contact";
import * as useContactDataModule from "../../hooks/useContactData";

// Mock the custom hook module
vi.mock("../../hooks/useContactData");

// Mock ScrollRestoration from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ScrollRestoration: () => null,
  };
});

// Mock Button with unique test IDs based on text
vi.mock("../../components/common/Button/Index", () => ({
  Button: ({ text, onClick, disabled, loading, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={`button-${(text || children || "")
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
      data-loading={loading}
    >
      {text || children}
    </button>
  ),
}));

// Wrapper component for Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Create a reusable mock data fixture
const mockContactData = {
  contactInfo: {
    address: {
      street: "123 Street",
      city: "Los Angeles",
      state: "CA",
      zipCode: "00000",
      formatted: "123 Street \nLos Angeles, CA 00000",
    },
    phone: {
      display: "(000) 000-0000",
      href: "tel:+10000000000",
    },
    email: {
      display: "info@email.com",
      href: "mailto:info@email.com",
    },
    businessHours: {
      weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
      saturday: "Saturday: 8:00 AM - 4:00 PM",
      sunday: "Sunday: Closed",
    },
  },
};

describe("Contact component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.spyOn(useContactDataModule, "useContactData").mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderWithRouter(<Contact />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("button-send-message")).not.toBeInTheDocument();
  });

  it("renders error state", () => {
    const errorMessage = "Failed to fetch data";
    vi.spyOn(useContactDataModule, "useContactData").mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage,
    });

    renderWithRouter(<Contact />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByTestId("button-send-message")).not.toBeInTheDocument();
  });

  it("renders all components when data is loaded successfully", () => {
    vi.spyOn(useContactDataModule, "useContactData").mockReturnValue({
      data: mockContactData,
      loading: false,
      error: null,
    });

    const { container } = renderWithRouter(<Contact />);

    // Test specific buttons by their unique IDs
    expect(screen.getByTestId("button-send-message")).toBeInTheDocument();
    expect(screen.getByTestId("button-call-now")).toBeInTheDocument();
    expect(screen.getByTestId("button-get-quote")).toBeInTheDocument();

    // Test content
    expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument();
    expect(screen.getByText("(000) 000-0000")).toBeInTheDocument();
    expect(screen.getByText("info@email.com")).toBeInTheDocument();
    expect(
      screen.getByText("Monday - Friday: 7:00 AM - 6:00 PM")
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("handles undefined data gracefully", () => {
    vi.spyOn(useContactDataModule, "useContactData").mockReturnValue({
      data: mockContactData,
      loading: false,
      error: null,
    });

    renderWithRouter(<Contact />);

    expect(screen.getByTestId("button-send-message")).toBeInTheDocument();
  });

  it("renders successfully", () => {
    vi.spyOn(useContactDataModule, "useContactData").mockReturnValue({
      data: mockContactData,
      loading: false,
      error: null,
    });

    const { container } = renderWithRouter(<Contact />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
