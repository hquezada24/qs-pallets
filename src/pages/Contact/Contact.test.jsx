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

vi.mock("../../components/common/Button/Index");
