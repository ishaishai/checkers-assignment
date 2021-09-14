import { useState } from "react";

const Checker = (props) => {
  return (
    <div
      className={`checker ${props.color}`}
      onClick={() => props.pickChecker(props.i, props.j)}
    ></div>
  );
};

export default Checker;
