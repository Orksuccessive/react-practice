// @vitest-environment jsdom

import {
  render,
  fireEvent,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { useRef } from "react";

import { useOnClickOutside } from "./useOnClickOutside";

function TestComponent({
  handler,
}: {
  handler: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, handler);

  return (
    <>
      <div ref={ref} data-testid="inside">
        Inside
      </div>

      <button data-testid="outside">
        Outside
      </button>
    </>
  );
}

describe("useOnClickOutside", () => {
  it("calls the handler only for outside clicks", () => {
    const handler = vi.fn();

    const { getByTestId } =
      render(
        <TestComponent handler={handler} />
      );

    fireEvent.mouseDown(
      getByTestId("inside")
    );

    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(
      getByTestId("outside")
    );

    expect(handler).toHaveBeenCalledTimes(1);
  });
});