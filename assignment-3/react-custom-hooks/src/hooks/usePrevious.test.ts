// @vitest-environment jsdom

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
  it("returns the previous value", () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: {
          value: 10,
        },
      }
    );

    expect(result.current).toBeUndefined();

    rerender({ value: 20 });

    expect(result.current).toBe(10);

    rerender({ value: 30 });

    expect(result.current).toBe(20);
  });
});