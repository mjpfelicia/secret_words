//import css
import './App.css';

//import React
import { useCallback, useEffect, useState } from 'react';

// import data
import { wordsList } from "./data/Words"

// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]


function App() {

  const [gameStage, SetGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  // console.log(words);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("")
  const [Letters, setLetters] = useState([]);

  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)
    return { word, category };
  }



  // starts the secret word game
  const startGame = () => {
    // pick word and pick category
    const { word, category } = pickWordAndCategory();

    // create an array of letters
    let wordLetter = word.split("");
    wordLetter = wordLetter.map((l) => l.toLowerCase());

    console.log(word, category)
    console.log(wordLetter)

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(Letters);


    SetGameStage(stages[1].name);
  }
  // process the Letter input
  const VerifyLetter = () => {
    SetGameStage(stages[2].name);
  }

  // restarts the game
  const retry = () => {
    SetGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game VerifyLetter={VerifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
