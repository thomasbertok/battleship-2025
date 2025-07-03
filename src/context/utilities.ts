import type { Battlefield, Ship, Cell, Coordinate, Orientation, BattlefieldType } from "../types/battleship";

/**
 * Checks if a ship can be placed on the battlefield at a given start position and direction.
 */
export function isValidPlacement(
  battlefield: Cell[][],
  shipSize: number,
  start: Coordinate,
  direction: Orientation
): boolean {
  const { row, column } = start;

  // Check if the ship fits in the battlefield
  if (
    (direction === "horizontal" && column + shipSize > battlefield[0].length) ||
    (direction === "vertical" && row + shipSize > battlefield.length)
  ) {
    return false;
  }

  // Check if the cells are empty
  for (let i = 0; i < shipSize; i++) {
    const cell = direction === "horizontal" ? battlefield[row][column + i] : battlefield[row + i][column];
    if (cell.status !== "empty") {
      return false;
    }
  }

  return true;
}

/**
 * Creates a ship at a random position on the battlefield.
 * @returns Ship object
 */
function createShip(index: number, battlefield: Battlefield, shipSize: number) {
  const fieldSize = battlefield.length;

  // Randomly choose a direction for the ship
  const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

  // Randomly choose a starting position
  // only generate numbers that fit the ship in the field, be it horizontal or vertical
  const startRow = Math.floor(Math.random() * (fieldSize - (direction === "vertical" ? shipSize : 0)));
  const startCol = Math.floor(Math.random() * (fieldSize - (direction === "horizontal" ? shipSize : 0)));

  // Check if the ship can be placed at the chosen position
  if (isValidPlacement(battlefield, shipSize, { row: startRow, column: startCol }, direction)) {
    // init coords array of the ship
    const shipCoords: Coordinate[] = [];

    // go through the size of the ship and mark the cells as part of the ship
    for (let i = 0; i < shipSize; i++) {
      // get the cell at the current position
      const cell: Cell =
        direction === "horizontal" ? battlefield[startRow][startCol + i] : battlefield[startRow + i][startCol];

      // It's a Ship!
      // mark the cell of the battlefield as part of the ship
      cell.status = "ship";
      cell.shipId = `ship-${index}`; // generate a random id for the ship

      // add the cell to the ship's coordinates
      shipCoords.push({ row: cell.row, column: cell.column });
    }

    // deploy a Ship
    return {
      id: `ship-${index}`, // generate a random id for the ship
      size: shipSize,
      coordinates: shipCoords,
      hits: 0,
      sunk: false,
    };
  }

  // If the ship cannot be placed, return null
  return null;
}

/**
 * Creates a grid of default/empty Cells
 * @returns A 2D array of Cells representing the battlefield
 */
export function createBattlefield(fieldSize: number, fleet: number[]): BattlefieldType {
  // init empty battlefield
  let battlefield = [] as Cell[][];
  // init empty ships array
  const ships = [] as Ship[];

  // Create a 2D array of empty Cells to fill with ships
  battlefield = Array.from({ length: fieldSize }, (_, rowIndex) =>
    Array.from({ length: fieldSize }, (_, colIndex) => ({
      row: rowIndex,
      column: colIndex,
      status: "empty",
      shipId: undefined,
    }))
  );

  // addd ships to the battlefield
  for (const [index, shipSize] of fleet.entries()) {
    let shipIsPlaced = false;
    let attempts = 0;

    // find a right place for the ship on the battlefield
    // do 100 attempts ... overkill?
    while (!shipIsPlaced && attempts < 100) {
      // create a new ship at a random position
      const newShip = createShip(index, battlefield, shipSize);

      // if the ship was created successfully, add it to the list of ships
      if (newShip) {
        ships.push(newShip);
        shipIsPlaced = true;
      }

      attempts++;
    }
  }

  return {
    battlefield,
    ships,
  };
}
