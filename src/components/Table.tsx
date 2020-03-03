import React from "react";
import Cell from "./Cell";
import WithMark from "./hoc/WithMark";

const Table: React.FC<ITableProps> = ({ cellCount, inProgress = false }) => {
  const cells = Array(cellCount).fill(Cell);
  return (
    <div className={inProgress ? "table table_active" : "table"}>
      {cells.map((Component, componentId) => {
        const ComponentWithMark = WithMark(Component);
        return <ComponentWithMark key={componentId} componentId={componentId} />;
      })}
    </div>
  );
};

export default Table;
