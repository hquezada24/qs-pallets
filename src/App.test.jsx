// App.test.jsx
// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

// Mock child components
vi.mock("./components/common/Header/Index", () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vi.mock("./components/common/Footer/Index", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe("App component", () => {
  it("renders header, main, and footer", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<div>Home Content</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders Outlet content", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<div>Test Page Content</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText("Test Page Content")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
