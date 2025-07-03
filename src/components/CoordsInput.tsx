import React, { useState } from "react";
import { z } from "zod";

import { useBattleship } from "../context/BattleshipContext";
import type { Coordinate } from "../types/battleship";

// zod schema to validate coordinates input
const coordsSchema = z.string().regex(/^[A-J](10|[1-9])$/, {
  message: "Please use a letter (A-J) followed by a number (1-10).",
});

/**
 * Component for inputting coordinates in a Battleship game
 */
export default function CoordsInput(): React.JSX.Element {
  const { shoot, gameSituation } = useBattleship();

  // inner state to hold coordinates input
  const [inputValue, setInputValue] = useState("");

  // error string
  const [error, setError] = useState<string | null>(null);

  // disabled state of form
  const [isDisabled, setIsDisabled] = useState(gameSituation !== "playing");

  // validate input with zod,
  // update states accordingly
  // return true if valid, false if invalid
  const validate = (value: string) => {
    const result = coordsSchema.safeParse(value);
    if (result.success) {
      setError(null);
      setIsDisabled(false);
      return true;
    } else {
      setError(result.error.errors[0].message);
      //setIsDisabled(true);
      return false;
    }
  };

  // onInputChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    validate(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // check validity
    if (!validate(inputValue)) return;

    // a5 -> 0,4
    const coords = translateCoords(inputValue);
    if (!coords) return;

    // FIRE!
    shoot(coords);

    // reset input value
    setInputValue("");
    // clear any previous error
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <div className={`${isDisabled ? "opacity-50" : ""} w-full max-w-xs`}>
        <label htmlFor="coordinates" className="text-sm font-bold text-gray-300">
          Enter your coordinates
        </label>

        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            tabIndex={0}
            id="coordinates"
            name="coordinates"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={3}
            autoFocus
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="Enter coordinates (eg. A5)"
            disabled={isDisabled}
            className={`
            px-3 rounded-md text-center font-mono text-sm h-12 w-96
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
            ${isDisabled ? "bg-slate-700 cursor-not-allowed" : "bg-sky-900"}
          `}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className={`
            w-12 h-12 rounded-md text-3xl font-bold
            ${
              isDisabled
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            }
          `}>
            &#187;
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

/**
 * translate coordinates to row and column
 */
function translateCoords(coords: string): Coordinate | null {
  // safety safety safety
  const trimmed = coords.trim().toUpperCase();

  // Check if the input is valid length
  if (trimmed.length < 2 || trimmed.length > 3) {
    return null;
  }

  // first char is letter (A-J), rest is number (1-10)
  const colChar = trimmed.charAt(0);
  // rest of the string is the row number
  const rowStr = trimmed.slice(1);

  // Validate column (A-J)
  if (colChar < "A" || colChar > "J") {
    return null;
  }

  // Validate row (1-10)
  const row = parseInt(rowStr, 10);
  if (isNaN(row) || row < 1 || row > 10) {
    return null;
  }

  return {
    row: row - 1, // Convert to 0-based index
    column: colChar.charCodeAt(0) - "A".charCodeAt(0), // Convert to 0-based index
  };
}
