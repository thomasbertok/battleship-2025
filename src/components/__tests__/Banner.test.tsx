import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Banner from "../Banner";
import { BattleshipContext } from "../../context/BattleshipContext";
import type { BattleshipContextType } from "../../types/battleship";

describe("Banner Component", () => {
  it("does not render the banner when playing", () => {
    const mockValue: BattleshipContextType = {
      battlefield: [],
      ships: [],
      totalHits: 10,
      totalMisses: 5,
      totalShots: 15,
      message: "You won!",
      shipsVisible: false,
      gameSituation: "playing",
      reset: vi.fn(),
      shoot: vi.fn(),
      toggleShips: vi.fn(),
    };

    render(
      <BattleshipContext.Provider value={mockValue}>
        <Banner />
      </BattleshipContext.Provider>
    );

    expect(screen.queryByTestId("banner")).not.toBeInTheDocument();
  });

  it("renders the banner on game over", () => {
    const mockValue: BattleshipContextType = {
      battlefield: [],
      ships: [],
      totalHits: 10,
      totalMisses: 5,
      totalShots: 15,
      message: "You won!",
      shipsVisible: false,
      gameSituation: "gameOver",
      reset: vi.fn(),
      shoot: vi.fn(),
      toggleShips: vi.fn(),
    };

    render(
      <BattleshipContext.Provider value={mockValue}>
        <Banner />
      </BattleshipContext.Provider>
    );

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByText("You won!")).toBeInTheDocument();
    expect(screen.getByText("All enemy ships have been sunk. Congratulations!")).toBeInTheDocument();
  });
});
