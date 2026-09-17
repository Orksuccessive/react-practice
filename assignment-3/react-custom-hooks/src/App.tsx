import {
  useRef,
  useState,
} from "react";

import {
  useDebounce,
  useFetch,
  useLocalStorage,
  useMediaQuery,
  useOnClickOutside,
  usePrevious,
} from "./hooks";

import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [text, setText] = useState("");

  const debouncedText =
    useDebounce(text, 500);

  const [count, setCount] =
    useLocalStorage("demo-count", 0);

  const previousCount =
    usePrevious(count);

  const isDesktop =
    useMediaQuery(
      "(min-width: 768px)"
    );

  const [open, setOpen] =
    useState(false);

  const boxRef =
    useRef<HTMLDivElement>(null);

  const {
    data,
    loading,
    error,
  } = useFetch<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  useOnClickOutside(
    boxRef,
    () => setOpen(false)
  );

  return (
    <main className="container">
      <h1 className="main-title">React Custom Hooks Lab</h1>

      <p>
        Six reusable hooks with unit tests.
      </p>

      <section className="grid">

        <article>
          <h2>useDebounce</h2>

          <input
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Type something..."
          />

          <p>
            Raw: {text || "—"}
          </p>

          <p>
            Debounced:{" "}
            {debouncedText || "—"}
          </p>
        </article>

        <article>
          <h2>useLocalStorage</h2>

          <button
            onClick={() =>
              setCount(
                (value) => value + 1
              )
            }
          >
            Count: {count}
          </button>

          <p>
            Refresh the page and the
            count remains.
          </p>
        </article>

        <article>
          <h2>useFetch</h2>

          {loading && (
            <p>Loading...</p>
          )}

          {error && (
            <p role="alert">
              {error.message}
            </p>
          )}

          {data && (
            <div>
              <p>{data.name}</p>
              <p>{data.email}</p>
            </div>
          )}
        </article>

        <article>
          <h2>usePrevious</h2>

          <p>
            Current: {count}
          </p>

          <p>
            Previous:{" "}
            {previousCount ?? "—"}
          </p>
        </article>

        <article ref={boxRef}>
          <h2>useOnClickOutside</h2>

          <button
            onClick={() =>
              setOpen(true)
            }
          >
            Open Panel
          </button>

          {open && (
            <div className="panel">
              Click outside this
              card to close.
            </div>
          )}
        </article>

        <article>
          <h2>useMediaQuery</h2>

          <p>
            {isDesktop
              ? "Desktop viewport"
              : "Mobile viewport"}
          </p>
        </article>

      </section>
    </main>
  );
}

export default App;