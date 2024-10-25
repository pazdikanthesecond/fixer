import React, { createContext, useEffect, useState } from "react";
import { GameStateManager } from "./game-state-manager";
import { GameState, GameContextType } from "../../types/game-state";
import { GameBrain } from "@/core/brain";
import seedrandom from "seedrandom";
import { Generator } from "@/core/generation/generator";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    return GameStateManager.load();
  });

  const seed = gameState.seed;
  let rng = seedrandom(seed, { state: true });

  if (gameState.seed_state) {
    rng = seedrandom("", { state: gameState.seed_state });
  }

  const saveGameState = (newState: GameState) => {
    setGameState(newState);
  };

  const updateGameState = (
    updates: (prevState: GameState) => Partial<GameState>
  ): GameState => {
    let newState: GameState;

    setGameState((prevState) => {
      const newUpdates =
        typeof updates === "function" ? updates(prevState) : updates;

      newState = { ...prevState, ...newUpdates }; // Capture the new state
      return newState;
    });

    return newState;
  };

  const generator = new Generator(rng);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      updateGameState(() => {
        return {
          seed_state: rng.state(),
        };
      });
      GameStateManager.save(gameState); // Save to localStorage only at intervals
      console.log("Game saved!");
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [gameState]);

  // Ensure GameBrain starts correctly
  useEffect(() => {
    GameBrain.start(gameState, generator);
  }, [gameState]);

  return (
    <GameContext.Provider
      value={
        {
          gameState,
          saveGameState,
          updateGameState,
          generator,
        } as GameContextType
      }
    >
      {children}
    </GameContext.Provider>
  );
};