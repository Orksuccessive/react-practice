import { useState } from "react";
import NaiveList from "./components/NaiveList";
import MemoList from "./components/MemoList";
import CallbackList from "./components/CallbackList";
import VirtualizedList from "./components/VirtualizedList";
import "./App.css";

type Version = "naive" | "memo" | "callback" | "virtualized";

function App() {
  const [version, setVersion] = useState<Version>("naive");

  return (
    <main>
      <h1>10,000 Item Performance Test</h1>

      <div className="controls">
        <button onClick={() => setVersion("naive")}>
          1. Naive
        </button>

        <button onClick={() => setVersion("memo")}>
          2. React.memo
        </button>

        <button onClick={() => setVersion("callback")}>
          3. memo + useCallback
        </button>

        <button onClick={() => setVersion("virtualized")}>
          4. react-window
        </button>
      </div>

      <section>
        {version === "naive" && <NaiveList />}
        {version === "memo" && <MemoList />}
        {version === "callback" && <CallbackList />}
        {version === "virtualized" && <VirtualizedList />}
      </section>
    </main>
  );
}

export default App;