// @vitest-environment jsdom

import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("updates the value only after the delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "hello" },
      }
    );

    expect(result.current).toBe("hello");

    rerender({ value: "hello world" });

    expect(result.current).toBe("hello");

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe("hello");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("hello world");

    vi.useRealTimers();
  });
});