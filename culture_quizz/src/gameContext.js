import React from "react";

const defaultState = {
  isInRoom: false,
  setInRoom: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
};

export default React.createContext(defaultState);