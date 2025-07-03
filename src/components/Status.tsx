import React from "react";

import { useBattleship } from "../context/BattleshipContext";

export default function Status(): React.JSX.Element {
  const { totalHits, totalMisses, totalShots, ships, message, reset, shipsVisible, toggleShips } = useBattleship();

  // Count the number of sunk ships
  const sunkShipsCount = ships && ships.length > 0 ? ships.filter((ship) => ship.sunk === true).length : 0;

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <h2 className="text-lg font-bold text-slate-200">Game Status</h2>

      {/* Status Information */}
      <div className="space-y-2 text-sm text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 font-bold">Sunken Ships:</span>
          <span className="font-bold">{`${sunkShipsCount} / ${ships.length}`}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-green-400 font-bold">Shots:</span>
          <span className="font-bold">{totalShots}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-green-400 font-bold">Misses:</span>
          <span className="font-bold">{totalMisses}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-green-400 font-bold">Hits:</span>
          <span className="font-bold">{totalHits}</span>
        </div>
        <hr className="my-8" />
        <div className="text-sm text-slate-400 mb-4">
          <p className="min-h-10">{message}</p>
        </div>
        <div>
          <button
            className="flex items-center justify-center w-full bg-green-800 hover:bg-green-700 disabled:bg-gray-900 disabled:text-gray-500 text-white py-2 rounded-md cursor-pointer"
            onClick={reset}>
            Restart
          </button>
        </div>
        <hr className="my-8" />
        <div>
          <label
            htmlFor="showShops"
            className="flex items-center space-x-2 cursor-pointer hover:text-white"
            onClick={toggleShips}>
            <input type="checkbox" name="showShips" id="showShips" checked={shipsVisible} onChange={toggleShips} />
            <span>Show ships</span>
          </label>
        </div>
      </div>
    </div>
  );
}
