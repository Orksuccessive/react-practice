import { useState } from "react";

function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Intentional component error!");
  }

  return (
    <div>
      <h2>Buggy Component</h2>

      <button onClick={() => setShouldThrow(true)}>
        Throw Error
      </button>
    </div>
  );
}

export default BuggyComponent;