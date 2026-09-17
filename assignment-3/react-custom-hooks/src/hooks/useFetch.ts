import { useEffect, useState } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(
  url: string | null
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: Boolean(url),
    error: null,
  });

  useEffect(() => {
    if (!url) {
      setState({
        data: null,
        loading: false,
        error: null,
      });

      return;
    }

    const controller = new AbortController();

    let active = true;

    setState({
      data: null,
      loading: true,
      error: null,
    });

    fetch(url, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        return await response.json() as T;
      })
      .then((data) => {
        if (active) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error) => {
        if (
          !active ||
          error?.name === "AbortError"
        ) {
          return;
        }

        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Unknown error"),
        });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [url]);

  return state;
}