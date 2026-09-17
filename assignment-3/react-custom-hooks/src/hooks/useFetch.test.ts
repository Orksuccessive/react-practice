// @vitest-environment jsdom

import {
  renderHook,
  waitFor,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { useFetch } from "./useFetch";

describe("useFetch", () => {
  it("handles loading and data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 1,
          name: "Alice",
        }),
      })
    );

    const { result } = renderHook(() =>
      useFetch<{ id: number; name: string }>(
        "/users/1"
      )
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual({
        id: 1,
        name: "Alice",
      });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles HTTP errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const { result } = renderHook(() =>
      useFetch("/users/1")
    );

    await waitFor(() => {
      expect(result.current.error?.message)
        .toContain("500");
    });

    expect(result.current.loading).toBe(false);
  });

  it("cancels the previous request when URL changes", () => {
    const abortListener = vi.fn();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        (_url: string, options: {
          signal: AbortSignal;
        }) => {
          options.signal.addEventListener(
            "abort",
            abortListener
          );

          return new Promise(() => {});
        }
      )
    );

    const { rerender } = renderHook(
      ({ url }) => useFetch(url),
      {
        initialProps: {
          url: "/users/1",
        },
      }
    );

    rerender({
      url: "/users/2",
    });

    expect(abortListener).toHaveBeenCalled();
  });
});