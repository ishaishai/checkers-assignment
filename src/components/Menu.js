const Menu = (props) => {
  const gameTitle = [..."CHECKERS GAME"];
  console.log(gameTitle);
  return (
    <div className="menu">
      <div className="game-title">
        {gameTitle.map((letter, i) => {
          if (letter === " ") {
            return <div style={{ width: "40px" }}></div>;
          } else
            return (
              <div
                className="title-letter"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {letter}
              </div>
            );
        })}
      </div>
      <div className="menu-box">
        <div className="menu-item" onClick={() => props.startGame(true)}>
          Start Game
        </div>
        <div className="menu-item">Credits</div>
        <div className="menu-item" onClick={()=> window.location="http://portfolio-6772a.web.app"}>Portfolio</div>
      </div>
    </div>
  );
};

export default Menu;
