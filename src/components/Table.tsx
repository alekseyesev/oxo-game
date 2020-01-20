import React from "react";
import Cell from "./Cell";

const Table: React.FC<ITableProps> = props => {
  const { inProgress = false, placeMark, cells } = props;

  return (
    <div className={inProgress ? "table table_active" : "table"}>
      {cells.map((cellProps, i) => (
        <Cell key={i} onClick={placeMark(i)} {...cellProps} />
      ))}
    </div>
  );
};

export default Table;
