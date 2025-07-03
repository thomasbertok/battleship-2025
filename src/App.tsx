import React from "react";
import "./css/App.css";

import { BattleshipProvider } from "./context/BattleshipContext";
import CoordsInput from "./components/CoordsInput";
import Battlefield from "./components/Battlefield";
import Status from "./components/Status";
import Banner from "./components/Banner";

import icon from "/battleship.svg"; // Import the icon image

function App(): React.JSX.Element {
  return (
    <BattleshipProvider>
      <div className="relative z-0 min-h-screen bg-gradient-to-b from-sky-950 to-gray-950 font-mono text-gray-300 h-full">
        <div className="container mx-auto p-8  min-h-screen flex flex-col items-center justify-start gap-16">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <img src={icon} alt="" width="48" height="48" />
              <h1 className="text-4xl font-bold text-slate-100">BattleShip</h1>
            </div>
            <p className="text-slate-500 text-sm">
              Sink all enemy ships! There's one Battleship (5 squares) and 2 Destroyers (4 squares each) hidden in the
              sea.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full">
            {/* Battlefield */}
            <div className="flex flex-4 flex-col items-center gap-8">
              <div className="bg-gray-950 p-9 rounded-md shadow-xl w-full flex flex-col items-center justify-center">
                <Battlefield />
              </div>

              {/* Coords Input */}
              <div className="bg-gray-950 p-4 rounded-md shadow-xl w-full">
                <CoordsInput />
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-1 w-full lg:w-auto bg-gray-950 p-4 rounded-md shadow-md">
              <Status />
            </div>
          </div>
        </div>
        <Banner />
      </div>
    </BattleshipProvider>
  );
}

export default App;
