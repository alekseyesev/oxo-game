import React from "react";

const Cell: React.FC<ICellProps> = props => {
  const defaultSwitchClasses: ICellProps = {
    active: false,
    oPlayer: false,
    xPlayer: false
  };

  const { children, ...switchClasses } = props;

  const classNamesBitMask: Map<number, string> = new Map([
    [2 ** 0, "table__cell"],
    [2 ** 1, "table__cell_active"],
    [2 ** 2, "table__cell_o"],
    [2 ** 3, "table__cell_x"]
  ]);

  const currentClassesBitMask: number = Number.parseInt(
    [true, ...Object.values({ ...defaultSwitchClasses, ...switchClasses })]
      .map(Number)
      .reverse()
      .join(""),
    2
  );

  return (
    <div
      className={Array.from(classNamesBitMask.entries())
        .reduce((classNamesList, [bit, className]) => {
          return (
            (Number(bit & currentClassesBitMask) > 0 &&
              (classNamesList.push(className), classNamesList)) ||
            classNamesList
          );
        }, [] as Array<string>)
        .join(" ")}
    />
  );
};

export default Cell;
