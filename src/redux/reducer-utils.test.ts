import { calculateScore, calculateMovesBitmap } from "./reducer-utils";

describe("reducer utilities", () => {
  it("should calculate score", () => {
    const prevState: number = 0;
    const value: number = 1;
    expect(calculateScore(prevState, value)).toEqual(1);
  });
  it("should calculate moves bitmap", () => {
    const prevState: Int8Array = Int8Array.from([0, 0, 0]);
    const tableMatrix: number = 3;
    const cellId: number = 1;
    expect(calculateMovesBitmap(prevState, tableMatrix, cellId)).toEqual(
      Int8Array.from([2, 0, 0])
    );
  });
});
