import { memo, useCallback, useState } from "react";
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

  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div className="row">
      <span>{name}</span>

      <button onClick={handleClick}>
        Select
      </button>
    </div>
  );
});

function CallbackList() {
  const [count, setCount] = useState(0);

  const handleSelect = useCallback((id: number) => {
    console.log("Selected:", id);
  }, []);

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

export default CallbackList;