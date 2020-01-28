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
    cellId > tableMatrix ? Math.floor(cellId / tableMatrix) : 0;
  const cellIndexInRow: number =
    cellId > tableMatrix ? cellId % tableMatrix : cellId;
  const cellBitmap: string = Array(tableMatrix)
    .fill(0)
    .map((bitValue, bitIndex) => (bitIndex === cellIndexInRow ? 1 : bitValue))
    .join("");

  newState[rowIndex] = newState[rowIndex] | Number.parseInt(cellBitmap, 2);

  return newState;
};
