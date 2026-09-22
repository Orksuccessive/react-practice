import ErrorBoundary from "./components/ErrorBoundary";
import BuggyComponent from "./components/BuggyComponent";
import AsyncComponent from "./components/AsyncComponent";
import "./App.css";

function App() {
  return (
    <main>
      <h1>React Error Handling</h1>

      <section>
        <h2>1. Error Boundary</h2>

        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. Async Error</h2>

          <ErrorBoundary>
      <AsyncComponent />
    </ErrorBoundary>
      </section>
    </main>
  );
}

export default App;