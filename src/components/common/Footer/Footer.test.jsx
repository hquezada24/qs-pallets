// Footer.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Index";

describe("Footer component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders brand name and tagline", () => {
    render(<Footer />);

    expect(screen.getByText("QS Pallets")).toBeInTheDocument();
    expect(
      screen.getByText("Quality pallets for your business needs")
    ).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Footer />);

    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText(/1415 FM 2216/i)).toBeInTheDocument();
    expect(screen.getByText(/Honey Grove, TX 75446/i)).toBeInTheDocument();
    expect(screen.getByText("(469) 555-1234")).toBeInTheDocument();
    expect(screen.getByText("info@qspallets.com")).toBeInTheDocument();
  });

  it("renders contact links with correct attributes", () => {
    render(<Footer />);

    const phoneLink = screen.getByRole("link", { name: "(469) 555-1234" });
    expect(phoneLink).toHaveAttribute("href", "tel:+14695551234");

    const emailLink = screen.getByRole("link", { name: "info@qspallets.com" });
    expect(emailLink).toHaveAttribute("href", "mailto:info@qspallets.com");
  });

  it("renders quick links navigation", () => {
    render(<Footer />);

    expect(screen.getByText("Quick Links")).toBeInTheDocument();

    const nav = screen.getByLabelText("Footer navigation");
    expect(nav).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services"
    );
    expect(screen.getByRole("link", { name: "Request Quote" })).toHaveAttribute(
      "href",
      "/request-a-quote"
    );
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("renders social media links with correct attributes", () => {
    render(<Footer />);

    expect(screen.getByText("Follow Us")).toBeInTheDocument();

    const facebookLink = screen.getByLabelText("Follow us on Facebook");
    expect(facebookLink).toHaveAttribute(
      "href",
      "https://www.facebook.com/qspallets"
    );
    expect(facebookLink).toHaveAttribute("target", "_blank");
    expect(facebookLink).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLink = screen.getByLabelText("Follow us on LinkedIn");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/qspallets"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    const instagramLink = screen.getByLabelText("Follow us on Instagram");
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/qspallets"
    );
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders copyright with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} QS Pallets. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");
    expect(footer).toHaveAttribute("role", "contentinfo");

    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Follow us on Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Follow us on LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Follow us on Instagram")).toBeInTheDocument();
  });

  it("renders all footer sections", () => {
    render(<Footer />);

    // Check that all main sections exist
    expect(screen.getByText("QS Pallets")).toBeInTheDocument(); // Logo section
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
