import Tile from "./Tile";
import { useState, useEffect } from "react";

const Board = (props) => {
  const [state, setState] = useState({
    matrix: [
      [null, "B", null, "B", null, "B", null, "B"],
      ["B", null, "B", null, "B", null, "B", null],
      [null, "B", null, "B", null, "B", null, "B"],
      ["X", null, "X", null, "X", null, "X", null],
      [null, "X", null, "X", null, "X", null, "X"],
      ["W", null, "W", null, "W", null, "W", null],
      [null, "W", null, "W", null, "W", null, "W"],
      ["W", null, "W", null, "W", null, "W", null],
    ],
    B: 12,
    W: 12,
    countB: 0, //touched wall
    countW: 0, //touched wall
  });
  const [playerTurn, setPlayerTurn] = useState("B");
  const [pickedChecker, setPickedChecker] = useState(null);

  useEffect(() => {
    if (state.B === 0 || state.W === 0) {
      alert(`${state.B === 0 ? "Black" : "White"} wins`);
    } else if (state.countB === 2 || state.countW === 2) {
      alert(`${state.countB === 2 ? "Black" : "White"} wins`);
    }
  }, [state.B, state.W, state.countW, state.countB]);

  const pickChecker = (i, j) => {
    if (!pickedChecker) {
      if (state.matrix[i][j] === playerTurn) {
        setPickedChecker({ i, j });
      } else {
        alert("Cannot touch opponment checkers");
      }
    } else {
      alert("Already picked one");
    }
  };

  //check if picked a tile which has differnce of 2 and a oppomnent checker if so eat it! :]
  const pickTile = (i, j) => {
    console.log(i, j);
    if (!pickedChecker) {
      alert("first pick checker");
      return;
    }
    if (state.matrix[i][j] === "X") {
      let tmpState = { ...state };
      if (
        ((playerTurn === "B" && i - pickedChecker.i === 1) ||
          (playerTurn === "W" && pickedChecker.i - i === 1)) &&
        Math.abs(pickedChecker.j - j) === 1
      ) {
        //regular move piece
        tmpState.matrix[i][j] = playerTurn;
        tmpState.matrix[pickedChecker.i][pickedChecker.j] = "X";
        setPickedChecker(null);
        setState(tmpState);
        setPlayerTurn(playerTurn === "W" ? "B" : "W");
      }
      //move and eat to left
      else if (Math.abs(pickedChecker.j - j) === 2) {
        //j difference has to be 2 to over jump
        if (
          (playerTurn === "B" &&
            i - pickedChecker.i === 2 &&
            state.matrix[i - 1][j - 1] === "W") || ///black eats white
          (playerTurn === "W" &&
            pickedChecker.i - i === 2 &&
            state.matrix[i + 1][j - 1] === "B") //white eats black
        ) {
          tmpState.matrix[playerTurn === "B" ? i - 1 : i + 1][j - 1] = "X";
        }
        //move and eat to left
        else if (
          (playerTurn === "B" &&
            i - pickedChecker.i === 2 &&
            state.matrix[i - 1][j + 1] === "W") || //black eats white
          (playerTurn === "W" &&
            pickedChecker.i - i === 2 &&
            state.matrix[i + 1][j + 1] === "B") //white eats black
        ) {
          tmpState.matrix[playerTurn === "B" ? i - 1 : i + 1][j + 1] = "X";
        } else {
          alert("Invalid move");
          setPickedChecker(null);
          return;
        }
        --tmpState[playerTurn];
        tmpState.matrix[i][j] = playerTurn;
        tmpState.matrix[pickedChecker.i][pickedChecker.j] = "X";
        setPickedChecker(null);
        setState(tmpState);
        setPlayerTurn(playerTurn === "W" ? "B" : "W");
      }
      if (playerTurn === "B" && i === 7) {
        tmpState.countB++;
      } else if (playerTurn === "W" && i === 0) {
        tmpState.countW++;
      }
    } else {
      alert("invalid Move");
      setPickedChecker(null);
      return;
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        height: "fit-content",
        width: "fit-content",
      }}
    >
      {state.matrix.map((row, i) => {
        let line = [];
        row.forEach((tile, j) => {
          line.push(
            tile ? (
              <Tile
                tileColor={
                  pickedChecker && pickedChecker.i == i && pickedChecker.j == j
                    ? "blue"
                    : "brown"
                }
                checkerColor={
                  tile === "B" ? "black" : tile === "W" ? "white" : null
                }
                pickTile={tile === "X" && pickTile}
                pickChecker={tile !== "X" && tile !== null && pickChecker}
                i={i}
                j={j}
              />
            ) : (
              <Tile tileColor="browner" pickTile={pickTile} i={i} j={j} />
            )
          );
        });
        return <div style={{ display: "flex" }}>{line}</div>;
      })}
      <button
        style={{
          position: "absolute",
          bottom: "5%",
        }}
        onClick={() => setPickedChecker(null)}
      >
        clear
      </button>
    </div>
  );
};

export default Board;
