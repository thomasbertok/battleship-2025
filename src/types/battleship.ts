/**
 * A coordinate on the board
 */
export type Coordinate = {
  row: number;
  column: number;
};

/**
 * A ship's definition in the game
 */
export type Ship = {
  // unique id of a ship, used to identify hits/sunkness
  id: string;
  // The size of the ship in cells
  size: number;
  // The number of hits the ship has taken
  hits: number;
  // The coordinates of the ship on the board
  coordinates?: Coordinate[];
  // Whether the ship has been sink sank sunk
  sunk?: boolean;
};

/**
 * Possible status of a cell in the game
 */
export type CellStatus = "empty" | "ship" | "hit" | "miss";

/**
 * A cell on the board
 */
export type Cell = {
  row: number;
  column: number;
  status: CellStatus;
  // if there's a ship in the cell, the id of the ship
  shipId?: string;
};

/**
 * 2D array of cells
 */
export type Battlefield = Cell[][];

export type GameSituation = "playing" | "gameOver";

/**
 * The state of the game
 */
export type GameState = {
  battlefield: Battlefield;
  ships: Ship[];
  totalHits: number;
  totalMisses: number;
  totalShots: number;
  message?: string;
  shipsVisible?: boolean;
  gameSituation: GameSituation;
};

/**
 * The context type for the game
 * ie the GameState + some functions
 */
export interface BattleshipContextType extends GameState {
  shoot: (coords: Coordinate) => void;
  reset: () => void;
  toggleShips: () => void;
}

/**
 * The orientation of a ship on the board
 */
export type Orientation = "horizontal" | "vertical";

export type BattlefieldType = {
  battlefield: Battlefield;
  ships: Ship[];
};
