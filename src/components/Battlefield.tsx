import React from "react";
import { useBattleship } from "../context/BattleshipContext";

/**
 * Component to render the Battleship game board
 * It creates a divs grid with horizontal and vertical labels.
 */
export default function Battlefield(): React.JSX.Element {
  const { battlefield, shipsVisible } = useBattleship();

  const size = battlefield.length;

  // Render horizontal LETTER labels of cols number from A
  const renderHorizontalLabels = (cols: number) => {
    return Array.from({ length: cols }, (_, idx) => (
      <div key={idx} className="flex-1 items-center justify-center text-xs text-center">
        {String.fromCharCode(idx + 65)}
      </div>
    ));
  };

  // Render vertical NUMBER labels of rows number from 1
  const renderVerticalLabels = (rows: number) => {
    return Array.from({ length: rows }, (_, idx) => (
      <div key={idx} className="text-xs text-end flex flex-1 items-center">
        {idx + 1}
      </div>
    ));
  };

  // Render the cells of the board following the battlefield's cell state
  const renderCells = () => {
    return battlefield.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}_${colIndex}`}
            className={`w-12 h-12 flex items-center justify-center text-xs rounded-sm ${
              cell.status === "hit"
                ? "bg-red-500"
                : cell.status === "miss"
                ? "bg-slate-600"
                : cell.status === "ship" && shipsVisible
                ? "bg-cyan-600"
                : "bg-sky-900"
            }`}>
            {shipsVisible && cell.shipId}
          </div>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative">
      {/* horizontal labels */}
      <div className="flex flex-row w-full items-center justify-between absolute -top-6 left-0">
        {renderHorizontalLabels(size)}
      </div>
      {/* vertical labels */}
      <div className="absolute -left-6 h-full flex flex-col items-center justify-between">
        {renderVerticalLabels(size)}
      </div>

      {/* the grid */}
      {/* TODO: make 10 a variable??? */}
      <div className={`grid grid-cols-10 grid-rows-10 gap-1`}>{renderCells()}</div>
    </div>
  );
}
