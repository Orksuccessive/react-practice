import { List } from "react-window";
import { items } from "../data";

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

function Row({ index, style }: RowProps) {
  const item = items[index];

  return (
    <div style={style} className="row">
      <span>
        {item.id}. {item.name}
      </span>

      <button onClick={() => console.log("Selected:", item.id)}>
        Select
      </button>
    </div>
  );
}

function VirtualizedList() {
  return (
    <List
      rowCount={items.length}
      rowHeight={50}
      style={{ height: 600, width: "100%" }}
      rowComponent={Row}
      rowProps={{}}
    />
  );
}

export default VirtualizedList;