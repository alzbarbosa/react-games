import { useState, useEffect } from "react";

import ReactConfetti from "react-confetti";
import { GiRollingDices } from "react-icons/gi";
import { nanoid } from "nanoid";

import Die from "../../components/tenzies-game/die.component";
import Instructions from "../../components/general-components/instructions/instructions.component";
import DisplayCount from "../../components/general-components/display-count/display-count.component";
import CustomBtn from "../../components/general-components/custom-btn/custom-btn.component";

const TenziesGame = () => {
  const [dieValue, setDieValue] = useState(allNewDice);
  const [win, setWin] = useState(false);
  const [count, setCount] = useState(0);
  const [record, setRecord] = useState(99);
  const [showRules, setShowRules] = useState(false);

  // use Effect to determinate if the user has won
  useEffect(() => {
    const allHeld = dieValue.every((die) => die.isHeld);
    const firstValue = dieValue[0].value;
    const allSameValue = dieValue.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setWin(true);
      setShowRules(false);
    }
  }, [dieValue]);

  // function to start new set of dice
  function allNewDice() {
    const dieArray = [];
    for (let i = 0; i < 10; i++) {
      dieArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return dieArray;
  }

  // function to roll the dice
  const rollDice = () => {
    if (win) {
      setRecord((prevRecord) => (prevRecord > count ? count : prevRecord));
      setDieValue(allNewDice);
      setWin(false);
      setCount(0);
    } else {
      setDieValue((prevDieValue) =>
        prevDieValue.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        })
      );
      setCount((prevCount) => prevCount + 1);
    }
  };

  // function to hold the die
  const holdDie = (id) => {
    setDieValue((prevDieValue) =>
      prevDieValue.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const rulesHandler = () => {
    setShowRules((prevRules) => !prevRules);
  };

  // Creating the dice
  const diceElements = dieValue.map((obj) => (
    <Die
      value={obj.value}
      isHeld={obj.isHeld}
      key={obj.id}
      onClick={() => holdDie(obj.id)}
    />
  ));

  // Frontend
  return (
    <>
      {win && <ReactConfetti />}
      <div className="box-container-border">
        <div className="box-container">
          <h1 className="tenzies-title">
            <GiRollingDices />
            Tenzies
            <GiRollingDices />
          </h1>

          {win ? (
            <h2>Congratulations, you won!</h2>
          ) : (
            <div className="rules-container">
              {showRules && (
                <Instructions
                  text="Roll until all dice are the same. Click each die to freeze it at
                  its current value between rolls."
                />
              )}
              <CustomBtn
                text={showRules ? "Close" : "Show Rules"}
                handler={rulesHandler}
              />
            </div>
          )}

          <div className="die-container">{diceElements}</div>
          <CustomBtn text={win ? "New Game" : "Roll"} handler={rollDice} />

          <div className="tries-info">
            <DisplayCount text="Number of rolls:" value={count} />
            <DisplayCount text="Record:" value={`${record} rolls`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TenziesGame;
