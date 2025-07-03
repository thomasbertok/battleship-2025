import React, { createContext, useCallback, useContext, useState } from "react";

import type { BattleshipContextType, GameState, Coordinate } from "../types/battleship";
import { createBattlefield } from "./utilities";

/**
 * constants for the game
 */
const BATTLEFIELD_SIZE = 10;
const FLEET = [5, 4, 4];

/**
 * Initializes the game state with a battlefield, ships, and counters
 * @returns an initial GameState object
 */
function initGameState(): GameState {
  // Create the battlefield and place ships
  const { battlefield, ships } = createBattlefield(BATTLEFIELD_SIZE, FLEET);

  let message = "Welcome to Battleship! Start shooting at the enemy ships!";

  if (ships.length === 0) {
    console.error("No ships were created. Please check the fleet configuration.");
    message = "No ships were created. Please check the fleet configuration.";
  }

  return {
    battlefield,
    ships,
    totalHits: 0,
    totalShots: 0,
    totalMisses: 0,
    message: message || "Welcome to Battleship! Start shooting at the enemy ships!",
    gameSituation: "playing",
    shipsVisible: false,
  };
}

/**
 * Context for the Battleship game
 */
export const BattleshipContext = createContext<BattleshipContextType | undefined>(undefined);

/**
 * Custom hook to access the BattleshipContext
 * @returns The value of the BattleshipContext
 */
export function useBattleship(): BattleshipContextType {
  const context = useContext(BattleshipContext);
  if (context === undefined) {
    throw new Error("useBattleship must be used within a BattleshipProvider");
  }
  return context;
}

/**
 * Provider for the BattleshipContext
 * @returns The BattleshipContext.Provider
 */
export function BattleshipProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  // Initialize the game state, first, null state
  const [gameState, setGameState] = useState<GameState>(initGameState());

  // Function to handle shooting at a coordinate
  const shoot = useCallback(
    (coords: Coordinate) => {
      // identify teh cell in the battlefiled from the coordinates
      const theCell = gameState.battlefield[coords.row][coords.column];

      // do nothing but send a message if user has already shot at this cell
      if (theCell.status === "hit" || theCell.status === "miss") {
        setGameState((prevState) => ({
          ...prevState,
          message: `You already shot at ${coords.row}, ${coords.column}. Try a different coordinate!`,
        }));
        return;
      }

      // If the cell is part of a ship
      if (theCell.status === "ship") {
        // If the cell has a ship, sink it!!!
        theCell.status = "hit";

        // ID the the ship that was hit
        const ship = gameState.ships.find((s) => s.id === theCell.shipId);

        if (ship) {
          ship.hits++;

          // Check if the ship is sunk
          if (ship.hits >= ship.size) {
            ship.sunk = true; // Mark the ship as sunk
            setGameState((prevState) => ({
              ...prevState,
              message: `You sunk a ship! ${ship.id} was destroyed!`,
            }));
          } else {
            // not yet sunk but close...
            setGameState((prevState) => ({
              ...prevState,

              battlefield: prevState.battlefield.map((row, rIdx) =>
                row.map((cell, cIdx) =>
                  rIdx === coords.row && cIdx === coords.column ? { ...cell, status: "hit" } : cell
                )
              ),

              message: `Hit! ${ship.id} has been hit!`,
            }));
          }
        }

        // update states
        setGameState((prevState) => ({
          ...prevState,
          totalHits: prevState.totalHits + 1,
          totalShots: prevState.totalShots + 1,
        }));
      } else {
        // If the cell is empty, mark it as a miss
        theCell.status = "miss";
        // update states
        setGameState((prevState) => ({
          ...prevState,
          totalMisses: prevState.totalMisses + 1,
          totalShots: prevState.totalShots + 1,
          message: `Missed at ${coords.row}, ${coords.column}. Try again!`,
        }));
      }

      // Check if all ships are sunk
      const fleetIsGone = gameState.ships.every((ship) => ship.sunk);

      // update state accordingly
      if (fleetIsGone) {
        setGameState((prevState) => ({
          ...prevState,
          gameSituation: "gameOver",
          message: "Congratulations! You have sunk all enemy ships!",
        }));
      }
    },
    [gameState.battlefield, gameState.ships]
  );

  // Reset the game state to the initial state
  const reset = () => {
    setGameState(initGameState());
  };

  const toggleShips = () => {
    setGameState((prevState) => ({
      ...prevState,
      shipsVisible: !prevState.shipsVisible,
    }));
  };

  // gather the provider value
  const gameStateValue: BattleshipContextType = {
    ...gameState,
    shoot,
    reset,
    toggleShips,
  };

  return <BattleshipContext.Provider value={gameStateValue}>{children}</BattleshipContext.Provider>;
}
