import React, { useMemo } from "react";

const Cell: React.FC<ICellProps> = ({
  onMove = undefined,
  active = false,
  oPlayer = false,
  xPlayer = false
}) => {
  const moveHandler: any = useMemo(() => {
    return (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      onMove && onMove()();
    };
  }, [onMove]);
  const classNameString: string = useMemo(() => {
    const classNamesBitMask: Map<number, string> = new Map([
      [2 ** 0, "table__cell"],
      [2 ** 1, "table__cell_active"],
      [2 ** 2, "table__cell_o"],
      [2 ** 3, "table__cell_x"]
    ]);
    const currentClassesBitMask: number = Number.parseInt(
      [true, ...Object.values({ active, oPlayer, xPlayer })]
        .map(Number)
        .reverse()
        .join(""),
      2
    );
    return Array.from(classNamesBitMask.entries())
      .reduce((classNamesList, [bit, className]) => {
        return (
          (Number(bit & currentClassesBitMask) > 0 &&
            (classNamesList.push(className), classNamesList)) ||
          classNamesList
        );
      }, [] as Array<string>)
      .join(" ");
  }, [active, oPlayer, xPlayer]);

  return (
    <div onClick={moveHandler} className={classNameString}>
      &nbsp;
    </div>
  );
};

export default Cell;
