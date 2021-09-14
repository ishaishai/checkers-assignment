import Checker from "./Checker";

// props -> tile color , checker color, potenMoves
//

const Tile = (props) => {
  return (
    <div
      className={`tile ${props.tileColor}`}
      onClick={props.pickTile ? () => props.pickTile(props.i, props.j) : null}
    >
      {props.checkerColor && (
        <Checker
          color={props.checkerColor}
          pickChecker={props.pickChecker}
          i={props.i}
          j={props.j}
        />
      )}
    </div>
  );
};

export default Tile;
