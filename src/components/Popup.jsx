import React from "react";
import { useEffect } from "react";
import { checkWin } from "../helpers/Helpers";

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
}) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Congratulations! You won! 🤩";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "You Lost! 😞";
    finalMessageRevealWord = `The word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
