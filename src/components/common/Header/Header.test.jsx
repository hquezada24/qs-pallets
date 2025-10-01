// Header.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Header } from "./Index";

const renderWithRouter = (component, initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
  );
};

describe("Header component", () => {
  beforeEach(() => {
    // Mock scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo and brand name", () => {
    renderWithRouter(<Header />);

    expect(screen.getByAltText("QS Pallets Logo")).toBeInTheDocument();
    expect(screen.getByText("QS Pallets")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    renderWithRouter(<Header />);

    // Check that navigation items exist (both desktop and mobile)
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    const productLinks = screen.getAllByRole("link", { name: "Products" });
    const quoteLinks = screen.getAllByRole("link", { name: "Request Quote" });
    const aboutLinks = screen.getAllByRole("link", { name: "About Us" });
    const contactLinks = screen.getAllByRole("link", { name: "Contact" });

    // Each link should appear twice (desktop + mobile)
    expect(homeLinks).toHaveLength(2);
    expect(productLinks).toHaveLength(2);
    expect(quoteLinks).toHaveLength(2);
    expect(aboutLinks).toHaveLength(2);
    expect(contactLinks).toHaveLength(2);
  });

  it("highlights active link based on current route", () => {
    renderWithRouter(<Header />, "/products");

    const productLinks = screen.getAllByRole("link", { name: "Products" });
    // Check if at least one has the active class (desktop or mobile)
    const hasActiveLink = productLinks.some(
      (link) =>
        link.className.includes("activeLink") ||
        link.className.includes("activeMobileLink")
    );
    expect(hasActiveLink).toBe(true);
  });

  it("toggles mobile menu when hamburger button is clicked", () => {
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Initially closed
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    // Close menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes mobile menu when clicking a link", () => {
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    // Click a mobile nav link
    const mobileNavLinks = screen.getAllByRole("link", { name: "Contact" });
    const mobileLink = mobileNavLinks.find((link) =>
      link.className.includes("mobileNavLink")
    );

    fireEvent.click(mobileLink);

    // Menu should close
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes menu when Escape key is pressed", () => {
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    // Press Escape
    fireEvent.keyDown(document, { key: "Escape" });

    // Menu should close
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes menu when clicking outside", () => {
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    // Click outside
    fireEvent.mouseDown(document.body);

    // Menu should close
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("adds scrolled class when scrolling down", () => {
    const { container } = renderWithRouter(<Header />);

    const header = container.querySelector("header");

    // Initially not scrolled
    expect(header.className).not.toContain("scrolled");

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    // Should have scrolled class
    waitFor(() => {
      expect(header.className).toContain("scrolled");
    });
  });

  it("has proper accessibility attributes", () => {
    renderWithRouter(<Header />);

    // Logo link
    expect(screen.getByLabelText("QS Pallets Home")).toBeInTheDocument();

    // Navigation
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile navigation")).toBeInTheDocument();

    // Menu button
    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(menuButton).toHaveAttribute("aria-expanded");
    expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation");
  });

  it("renders without crashing", () => {
    const { container } = renderWithRouter(<Header />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
