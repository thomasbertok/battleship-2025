import { describe, it, expect } from "vitest";
import { createBattlefield, isValidPlacement } from "../utilities";
import type { Battlefield, Cell } from "../../types/battleship";

/**
 * Tests for the isValidPlacement function
 */
describe("isValidPlacement", () => {
  const battlefield: Battlefield = Array.from({ length: 10 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => ({
      row: rowIndex,
      column: colIndex,
      status: "empty",
      shipId: undefined,
    }))
  );
  it("should return true for a vertical valid placement", () => {
    expect(isValidPlacement(battlefield, 4, { row: 0, column: 0 }, "vertical")).toBe(true);
  });

  it("should return true for a horizontal valid placement", () => {
    expect(isValidPlacement(battlefield, 4, { row: 0, column: 0 }, "horizontal")).toBe(true);
  });

  it("should return false for a vertical invalid placement (out of bounds)", () => {
    expect(isValidPlacement(battlefield, 4, { row: 8, column: 0 }, "vertical")).toBe(false);
  });

  it("should return false for a horizontal invalid placement (out of bounds)", () => {
    expect(isValidPlacement(battlefield, 4, { row: 0, column: 7 }, "horizontal")).toBe(false);
  });
});

/**
 * Tests for the createBattlefield function
 */
describe("createBattlefield", () => {
  const fleet = [2, 3, 3, 4, 5];
  const field = createBattlefield(10, fleet);

  it("should create a result with a battlefield and a set of ships", () => {
    expect(field).toHaveProperty("battlefield");
    expect(field).toHaveProperty("ships");
  });

  it("should create a battlefield with the correct dimensions", () => {
    expect(field.battlefield).toHaveLength(10);
  });

  it("should create a battlefield with each row having the correct number of cells", () => {
    field.battlefield.forEach((row) => {
      expect(row).toHaveLength(10);
    });
  });

  it("should create a battlefield with cells having the correct properties", () => {
    field.battlefield.forEach((row) => {
      row.forEach((cell: Cell) => {
        expect(cell).toHaveProperty("row");
        expect(cell).toHaveProperty("column");
        expect(cell).toHaveProperty("status");
        expect(cell).toHaveProperty("shipId");
      });
    });
  });

  it("should create a Ships array with the correct number of ships", () => {
    expect(field.ships).toHaveLength(fleet.length);
  });
});
