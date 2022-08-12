import "./App.css";
import { useState, useEffect } from "react";
import Figure from "./components/Figure";
import Header from "./components/Header";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from "./helpers/Helpers";

const App = () => {
  const words = ["application", "programming", "interface", "anjalwizard"];
  const [selectedWord, setSelectedWord] = useState("");

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters([...correctLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters([...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    setSelectedWord(words[random]);
  }

  document.title = "Hangman Game";

  return (
    <>
      <Header />
      <Figure wrongLetters={wrongLetters} />
      <WrongLetters wrongLetters={wrongLetters} />
      <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      <Notification showNotification={showNotification} />
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
    </>
  );
};

export default App;
