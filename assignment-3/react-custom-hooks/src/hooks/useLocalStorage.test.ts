// @vitest-environment jsdom

import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("count", 0)
    );

    expect(result.current[0]).toBe(0);
  });

  it("persists updated values", () => {
    const { result } = renderHook(() =>
      useLocalStorage("count", 0)
    );

    act(() => {
      result.current[1](10);
    });

    expect(result.current[0]).toBe(10);
    expect(localStorage.getItem("count")).toBe("10");
  });

  it("loads an existing value from localStorage", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Om" })
    );

    const { result } = renderHook(() =>
      useLocalStorage("user", { name: "Default" })
    );

    expect(result.current[0]).toEqual({
      name: "Om",
    });
  });
});