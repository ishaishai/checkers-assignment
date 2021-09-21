import { useEffect, useState } from "react";

const Checker = (props) => {
  return (
    <div
      className={`checker ${props.i}${props.j} ${props.color}`}
      onClick={() => props.pickChecker(props.i, props.j)}
    ></div>
  );
};

export default Checker;
