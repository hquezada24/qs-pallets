import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";

import isPastDate from "./isPastDate";

describe("isPastDate", () => {
  const FIXED_NOW = new Date("2026-04-10T12:00:00.000Z");

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return true", () => {
    expect(isPastDate("2026-04-09")).toBe(true);
    expect(isPastDate("2025-12-31T23:59:59Z")).toBe(true);
  });

  it("should return false for a future date", () => {
    expect(isPastDate("2026-04-11")).toBe(false);
    expect(isPastDate("2027-01-01T00:00:00Z")).toBe(false);
  });

  it("should return false for la today's date", () => {
    expect(isPastDate("2026-04-10")).toBe(false);
    expect(isPastDate("2026-04-10T11:59:59Z")).toBe(false);
    expect(isPastDate("2026-04-10T12:00:00Z")).toBe(false);
    expect(isPastDate("2026-04-10T13:00:00Z")).toBe(false);
  });

  it("should manejar correctamente strings ISO completos", () => {
    expect(isPastDate("2026-04-09T23:59:59.999Z")).toBe(true);
    expect(isPastDate("2026-04-10T12:00:01Z")).toBe(false);
  });

  it("should return false when date is invalid", () => {
    expect(isPastDate("")).toBe(false);
    expect(isPastDate("invalid-date")).toBe(false);
    expect(isPastDate("2026-04-31")).toBe(false);
  });

  it("should handle different date formats", () => {
    expect(isPastDate("2026-04-09T00:00:00")).toBe(true);
    expect(isPastDate("04/09/2026")).toBe(true);
    expect(isPastDate("2026/04/09")).toBe(true);
  });

  it("should work with old or far dates", () => {
    expect(isPastDate("1900-01-01")).toBe(true);
    expect(isPastDate("9999-12-31")).toBe(false);
  });
});
