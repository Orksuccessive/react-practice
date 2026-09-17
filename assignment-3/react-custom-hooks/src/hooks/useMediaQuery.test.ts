
// @vitest-environment jsdom

import {
  renderHook,
  act,
} from "@testing-library/react";

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let changeHandler: () => void;
  let mediaQuery: {
    matches: boolean;
    addEventListener: (
      event: string,
      handler: () => void
    ) => void;
    removeEventListener: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mediaQuery = {
      matches: false,

      addEventListener: (
        _event: string,
        handler: () => void
      ) => {
        changeHandler = handler;
      },

      removeEventListener: vi.fn(),
    };

    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue(mediaQuery)
    );
  });

  it("returns the media query state", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(min-width: 768px)")
    );

    expect(result.current).toBe(false);
  });

  it("updates when the media query changes", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(min-width: 768px)")
    );

    act(() => {
      mediaQuery.matches = true;
      changeHandler();
    });

    expect(result.current).toBe(true);
  });
});
