import {
  useEffect,
  useState,
} from "react";

export function useMediaQuery(
  query: string
): boolean {
  const getMatches = () =>
    typeof window !== "undefined" &&
    window.matchMedia(query).matches;

  const [matches, setMatches] =
    useState(getMatches);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [query]);

  return matches;
}