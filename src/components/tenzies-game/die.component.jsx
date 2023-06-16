import {
  CgDice1,
  CgDice2,
  CgDice3,
  CgDice4,
  CgDice5,
  CgDice6,
} from "react-icons/cg";

import "./die.styles.css";

const Die = ({ value, isHeld, onClick }) => {
  return (
    <>
      <div className={`die ${isHeld ? "held" : ""}`} onClick={onClick}>
        {value === 1 ? (
          <CgDice1 />
        ) : value === 2 ? (
          <CgDice2 />
        ) : value === 3 ? (
          <CgDice3 />
        ) : value === 4 ? (
          <CgDice4 />
        ) : value === 5 ? (
          <CgDice5 />
        ) : (
          <CgDice6 />
        )}
      </div>
    </>
  );
};

export default Die;
