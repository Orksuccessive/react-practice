import { useState } from "react";

function AsyncComponent() {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://example.com/this-url-does-not-exist"
      );

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status}`
        );
      }

      await response.json();
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  };

  // Important:
  // The async error is now thrown during React rendering.
  if (error) {
    throw error;
  }

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default AsyncComponent;