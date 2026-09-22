import { memo, useState } from "react";
import { items } from "../data";

interface RowProps {
  id: number;
  name: string;
  onSelect: (id: number) => void;
}

const Row = memo(function Row({
  id,
  name,
  onSelect,
}: RowProps) {
  //console.log("Rendering:", id);

  return (
    <div className="row">
      <span>{name}</span>

      <button onClick={() => onSelect(id)}>
        Select
      </button>
    </div>
  );
});

function MemoList() {
  const [count, setCount] = useState(0);

  const handleSelect = (id: number) => {
    console.log("Selected:", id);
  };

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>
        Parent Render: {count}
      </button>

      <div className="list">
        {items.map((item) => (
          <Row
            key={item.id}
            id={item.id}
            name={item.name}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
}

export default MemoList;