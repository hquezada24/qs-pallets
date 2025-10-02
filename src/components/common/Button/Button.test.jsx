// Button.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "./Index";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button text="Click Me" />);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders text correctly", () => {
    render(<Button text="Submit" />);

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button text="Test" className="custom-class" />);

    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button text="Primary" variant="primary" />);
    let button = screen.getByRole("button");
    expect(button.className).toContain("primary");

    rerender(<Button text="Secondary" variant="secondary" />);
    button = screen.getByRole("button");
    expect(button.className).toContain("secondary");

    rerender(<Button text="Outline" variant="outline" />);
    button = screen.getByRole("button");
    expect(button.className).toContain("outline");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button text="Small" size="small" />);
    let button = screen.getByRole("button");
    expect(button.className).toContain("small");

    rerender(<Button text="Medium" size="medium" />);
    button = screen.getByRole("button");
    expect(button.className).toContain("medium");

    rerender(<Button text="Large" size="large" />);
    button = screen.getByRole("button");
    expect(button.className).toContain("large");
  });

  it("handles onClick events", () => {
    const handleClick = vi.fn();
    render(<Button text="Click" onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(<Button text="Click" onClick={handleClick} disabled />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", () => {
    const handleClick = vi.fn();
    renderWithRouter(<Button text="Click" onClick={handleClick} loading />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders as disabled when disabled prop is true", () => {
    render(<Button text="Disabled" disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("disabled");
  });

  it("renders as disabled when loading", () => {
    renderWithRouter(<Button text="Loading" loading />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("loading");
  });

  it("shows spinner when loading", () => {
    renderWithRouter(<Button text="Loading" loading />);

    const spinner = document.querySelector('[aria-hidden="true"]');
    expect(spinner).toBeInTheDocument();
    expect(spinner.className).toContain("spinner");
  });

  it("renders with internal link", () => {
    renderWithRouter(<Button text="Go Home" link="/" />);

    const link = screen.getByRole("link", { name: "Go Home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("hides text when loading with link", () => {
    renderWithRouter(<Button text="Submit" link="/submit" loading />);

    const link = screen.getByRole("link");
    expect(link.className).toContain("textHidden");
  });

  it("hides text when loading without link", () => {
    render(<Button text="Submit" loading />);

    const span = screen.getByText("Submit");
    expect(span.className).toContain("textHidden");
  });

  it("uses custom aria-label when provided", () => {
    render(<Button text="X" ariaLabel="Close dialog" />);

    const button = screen.getByRole("button", { name: "Close dialog" });
    expect(button).toBeInTheDocument();
  });

  it("uses text as aria-label when ariaLabel not provided", () => {
    render(<Button text="Submit Form" />);

    const button = screen.getByRole("button", { name: "Submit Form" });
    expect(button).toHaveAttribute("aria-label", "Submit Form");
  });

  it("accepts different button types", () => {
    const { rerender } = render(<Button text="Submit" type="submit" />);
    let button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");

    rerender(<Button text="Reset" type="reset" />);
    button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "reset");
  });

  it("passes through additional props", () => {
    render(<Button text="Test" data-testid="custom-button" id="my-button" />);

    const button = screen.getByTestId("custom-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "my-button");
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(<Button text="Click" onClick={handleClick} disabled />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders as disabled when disabled prop is true", () => {
    render(<Button text="Disabled" disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("disabled");
  });

  it("renders without crashing", () => {
    const { container } = render(<Button text="Test" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
