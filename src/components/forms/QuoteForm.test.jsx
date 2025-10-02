// QuoteForm.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuoteForm from "./QuoteForm";

// Mock Button component
vi.mock("../common/Button/Index", () => ({
  Button: ({ text, onClick, disabled, loading, type }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-loading={loading}
      data-testid={`button-${(text || "").toLowerCase().replace(/\s+/g, "-")}`}
    >
      {text}
    </button>
  ),
}));

describe("QuoteForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // ... other tests ...

  it("submits form successfully with valid data", async () => {
    // Mock the fetch response for this specific test
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        })
      )
    );

    render(<QuoteForm />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "(555) 555-5555" },
    });
    fireEvent.change(screen.getByLabelText(/Pallet Type/i), {
      target: { value: "NEW" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "100" },
    });

    const submitButton = screen.getByTestId("button-submit-quote-request");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/request-a-quote"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Quote request submitted successfully/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error message when submission fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      )
    );

    render(<QuoteForm />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "(555) 555-5555" },
    });
    fireEvent.change(screen.getByLabelText(/Pallet Type/i), {
      target: { value: "NEW" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "100" },
    });

    const submitButton = screen.getByTestId("button-submit-quote-request");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Error submitting quote request/i)
      ).toBeInTheDocument();
    });
  });

  it("clears form after successful submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        })
      )
    );

    render(<QuoteForm />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "(555) 555-5555" },
    });
    fireEvent.change(screen.getByLabelText(/Pallet Type/i), {
      target: { value: "NEW" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "100" },
    });

    const submitButton = screen.getByTestId("button-submit-quote-request");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });
  });

  it("disables submit button while submitting", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: () => Promise.resolve({ success: true }),
                }),
              100
            )
          )
      )
    );

    render(<QuoteForm />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "(555) 555-5555" },
    });
    fireEvent.change(screen.getByLabelText(/Pallet Type/i), {
      target: { value: "NEW" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "100" },
    });

    const submitButton = screen.getByTestId("button-submit-quote-request");
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
