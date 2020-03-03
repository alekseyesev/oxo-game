export const calculateScore = (prevState: number, value: number): number => {
  return prevState + value;
};

export const calculateMovesBitmap = (
  prevState: Int8Array,
  tableMatrix: number,
  cellId: number
): Int8Array => {
  const newState: Int8Array = Int8Array.from(prevState);
  const rowIndex: number =
    cellId >= tableMatrix ? Math.floor(cellId / tableMatrix) : 0;
  const cellIndexInRow: number =
    cellId >= tableMatrix ? cellId % tableMatrix : cellId;
  const cellBitmap: string = Array(tableMatrix)
    .fill(0)
    .map((bit, bitIndex) => (bitIndex === cellIndexInRow ? 1 : bit))
    .join("");

  newState[rowIndex] = newState[rowIndex] | Number.parseInt(cellBitmap, 2);

  return newState;
};

const bitFilter = (
  { filter, rightShift }: bitFilterCache,
  rowBitmap: number
): bitFilterCache => {
  filter.push(
    Number(
      (rowBitmap >> rightShift)
        .toString(2)
        .split("")
        .pop()
    )
  );
  rightShift -= 1;
  return { filter, rightShift };
};
const isHorizontalLine = (
  movesBitmap: Int8Array,
  tableMatrix: number
): boolean => movesBitmap.includes(Number.parseInt("1".repeat(tableMatrix), 2));
const isVerticalLine = (movesBitmap: Int8Array): boolean =>
  !movesBitmap.includes(0) &&
  movesBitmap.reduce(
    (prevRowBitmap, currentRowBitmap) => prevRowBitmap & currentRowBitmap
  ) > 0;
const isDiagonalLine = (
  movesBitmap: Int8Array,
  tableMatrix: number,
  movesBitmapReverse: boolean = false
) =>
  !movesBitmap.includes(0) &&
  (movesBitmapReverse
    ? Array.from(movesBitmap).reverse()
    : Array.from(movesBitmap)
  )
    .reduce(bitFilter, {
      filter: [],
      rightShift: tableMatrix - 1
    } as bitFilterCache)
    .filter.every((int: number): boolean => int === 1);
const isDiagonalLineInverse = (movesBitmap: Int8Array, tableMatrix: number) =>
  isDiagonalLine(movesBitmap, tableMatrix, true);

export const getWinnerStatus = (movesBitmap: Int8Array): winner => {
  const tableMatrix: number = movesBitmap.length;
  if (isHorizontalLine(movesBitmap, tableMatrix)) {
    return "round";
  } else if (isVerticalLine(movesBitmap)) {
    return "round";
  } else if (
    isDiagonalLine(movesBitmap, tableMatrix) ||
    isDiagonalLineInverse(movesBitmap, tableMatrix)
  ) {
    return "round";
  } else {
    return "not yet";
  }
};
