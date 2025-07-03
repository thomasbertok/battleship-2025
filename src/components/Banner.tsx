import React from "react";
import { useBattleship } from "../context/BattleshipContext";

export default function Banner(): React.JSX.Element | null {
  const { totalHits, totalMisses, totalShots, gameSituation, reset } = useBattleship();

  if (gameSituation === "playing") {
    return null; // Don't render the banner if the game is still in progress
  }

  return (
    <div
      data-testid="banner"
      className="fixed z-50 inset-0 bg-gray-900 flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-bold text-white">You won!</h1>
      <p className="text-gray-400 text-lg mt-2">All enemy ships have been sunk. Congratulations!</p>
      <div className="mt-4 text-gray-300 w-48">
        <div className="mb-2 flex items-center justify-between gap-7">
          <span className="font-bold text-green-400">Total Hits:</span> {totalHits}
        </div>
        <div className="mb-2 flex items-center justify-between gap-7">
          <span className="font-bold text-green-400">Total Misses:</span> {totalMisses}
        </div>

        <div className="mb-2 flex items-center justify-between gap-7">
          <span className="font-bold text-green-400">Total Shots:</span> {totalShots}
        </div>
      </div>
      <div className="mb-2 flex flex-col items-center gap-4">
        <h3>Your Accuracy:</h3>
        <span className="font-bold text-7xl text-green-400">
          {totalShots > 0 ? ((totalHits / totalShots) * 100).toFixed(0) : 0}%
        </span>
      </div>

      <button
        role="button"
        name="restart-game"
        className="bg-green-800 hover:bg-green-700 disabled:bg-gray-900 disabled:text-gray-500 text-white p-2 rounded-md cursor-pointer"
        onClick={reset}>
        Restart
      </button>
    </div>
  );
}
