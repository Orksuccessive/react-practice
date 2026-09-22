import { useState } from "react";
import { items } from "../data";

function NaiveList() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>
        Parent Render: {count}
      </button>

      <div className="list">
        {items.map((item) => (
          <div className="row" key={item.id}>
            <span>{item.name}</span>

            <button onClick={() => console.log("Selected:", item.name)}>
              Select
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default NaiveList;